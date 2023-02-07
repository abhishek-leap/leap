import styled from "@emotion/native";
import { ReactComponent as Shield } from "images/dare/shield-v3.svg";
import { useState, useRef, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Modal, Button } from "ui-kit/components";
import { isXamarinApp } from "utils/userAgentHelper";
import changeIcon from "../../../images/change-image-icon.svg";
import Editor from "./avatar-editor/editor/Editor";
import { Link } from "react-router-dom";
import * as API from "utils/webAPI";
import { MEDIA } from "config/http";
import defaultThumbnail from "images/defaultCover.png";
import { setLocalStorageValue, getLocalStorageValue } from "../../ducks/user/saga";
import { AVATAR_ID } from "utils/http";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const Thumbnail = ({
  size = "34.5px",
  edit,
  label: customLabel,
  entityId,
  entityRole,
  alias,
  disableLink,
  closeModal
}) => {
  const [avatarId, setAvatarId] = useState(getLocalStorageValue(AVATAR_ID));
  const [srcImg, setSrcImg] = useState(
    entityId ? `${MEDIA}/Attachments/avatar/download/${entityId}_200x200.jpeg?v=${avatarId}` : defaultThumbnail
  );
  const [newImgState, setNewImgState] = useState({
    showModal: false,
    loadedImg: "",
    zoomValue: 1,
    isModalMessageOpened: false
  });
  const fileRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    setAvatarId(getLocalStorageValue(AVATAR_ID));
  }, [srcImg]);

  useEffect(() => {
    setSrcImg(`${MEDIA}/Attachments/avatar/download/${entityId}_200x200.jpeg?v=${avatarId}`);
  }, [entityId]);

  const handleImageChange = event => {
    event.preventDefault();
    const file = event.target.files[0];

    if (ALLOWED_TYPES.includes(file.type)) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewImgState(prev => ({ ...prev, loadedImg: reader.result, showModal: true }));
      };

      reader.readAsDataURL(file);
    } else {
      setNewImgState(prev => ({ ...prev, loadedImg: "", showModal: false }));

      openModalMessage();
    }
    fileRef.current = null;
  };

  const openModalMessage = () => setNewImgState(prev => ({ ...prev, isModalMessageOpened: true }));

  const closeModalMessage = () => setNewImgState(prev => ({ ...prev, isModalMessageOpened: false }));

  const handleZoom = e => {
    setNewImgState(prev => ({ ...prev, zoomValue: e.target.value }));
  };

  const changeImage = () => {
    toggleModal();
    fileRef?.current?.click();
  };

  const toggleModal = () => {
    setNewImgState(prev => ({ ...prev, showModal: !newImgState.showModal }));
  };

  const onClickSave = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL("image/png");
      const data = {
        origin: newImgState.loadedImg.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        cropped: {
          croppedSize: `${canvasScaled.width}x${canvasScaled.height}`,
          src: croppedImg.replace(/^data:image\/(png|jpg);base64,/, "")
        },
        avatarUrl: croppedImg,
        entityId: entityId
      };

      uploadProfilePic(data);

      toggleModal();
    }
  };

  const uploadProfilePic = async avatar => {
    try {
      localStorage.removeItem(AVATAR_ID);
      const { data } = await API.sendAvatar(avatar);
      setLocalStorageValue(AVATAR_ID, data.id);
      setSrcImg(srcImg + `?v=${data.id}`);
    } catch (e) {}
  };

  return (
    <ThumbnailContainer width={size}>
      <ShieldFrame width="100%" height="100%" />
      <Content>
        <StyledLink
          to={entityRole && alias ? `/${entityRole}/${alias}` : ""}
          disable={disableLink ? "disable" : ""}
          onClick={e => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (closeModal) closeModal();
          }}
        >
          <ThumbnailBgImage
            src={srcImg}
            onError={err => {
              setSrcImg("/images/default-avatar.svg");
            }}
          />
        </StyledLink>
        {edit && (
          <EditContainer>
            <InputLabel htmlFor="img">
              <FileInput
                id="img"
                type="file"
                ref={file => {
                  fileRef.current = file;
                }}
                onChange={handleImageChange}
                {...(isXamarinApp ? {} : { accept: ".png, .jpg, .jpeg" })}
              />
              <EditIconOrText>{customLabel || <img src={changeIcon} alt="change avater" />}</EditIconOrText>
            </InputLabel>
            <Modal opened={newImgState.isModalMessageOpened} onClose={closeModalMessage} withoutBtn={true}>
              <ModalMessage>
                <FormattedMessage
                  id="uploadAvatarFormatErrorMessage"
                  defaultMessage="You can upload only jpg or png image format"
                />
                <ModalButton primary={true} onClick={closeModalMessage}>
                  <FormattedMessage id="confirmOk" defaultMessage="Ok" />
                </ModalButton>
              </ModalMessage>
            </Modal>
          </EditContainer>
        )}
      </Content>
      <Editor
        showModal={newImgState.showModal}
        setEditorRef={ele => {
          editorRef.current = ele;
        }}
        imagePreviewUrl={newImgState.loadedImg}
        zoomValue={newImgState.zoomValue}
        handleZoom={handleZoom}
        onClickSave={onClickSave}
        changeImage={changeImage}
        rotate={newImgState.rotate}
        onClose={toggleModal}
      />
    </ThumbnailContainer>
  );
};

export default Thumbnail;

const ShieldFrame = styled(Shield)`
  position: absolute;
  top: 0;
  left: 0;
`;

const EditContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.3s ease;
`;

const InputLabel = styled.label`
  cursor: pointer;
  height: 100%;
  width: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const EditIconOrText = styled.View`
  color: #fff;
  font-size: 10px;
  line-height: 1.3;
  padding: 5px;
  text-align: center;
  width: 100%;
`;

const ModalMessage = styled.View`
  color: #6a6a6a;
  line-height: 2;
  text-align: center;
  padding: 10px;
  font-size: 15px;
  font-family: Metropolis;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ModalButton = styled(Button)`
  width: 80px;
`;
const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  ${props => props.disable && `pointer-events: none;`}
`;

const ThumbnailContainer = styled.View`
  aspect-ratio: 0.9;
  width: ${props => props.width};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThumbnailBgImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Content = styled.View`
  width: 100%;
  height: 100%;
  -webkit-clip-path: url(#my-clip-path);
  clip-path: url(#my-clip-path);
  transform: scale(0.85);
`;
