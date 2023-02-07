import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { FormattedMessage, injectIntl } from "react-intl";
import Avatar from "components/avatar/Avatar";
import { Modal, Button } from "ui-kit/components";
import { getClassName, addModifierTo } from "ui-kit/utils/component";
import { uploadClubAvatar, uploadAgencyAvatar, uploadAvatar } from "ducks/profile/actions";
import Editor from "./editor/Editor";
import EXIF from "exif-js";
import { isIOS, isXamarinApp } from "utils/userAgentHelper";
import changeIcon from "../../images/default-avatar/change-image-icon.svg";
import Loader from "ui-kit/components/loader/Loader";
import "./AvatarEditor.scss";

const ALLOWED_TYPES = ["image/jpeg", "image/pjpeg", "image/png"];

class AvatarEditor extends Component {
  state = {
    showModal: false,
    loadedImg: "",
    previewImg: "",
    zoomValue: 1,
    isModalMessageOpened: false
  };

  componentDidUpdate() {
    if (this.props.setEditorModalOpen) {
      this.props.setEditorModalOpen(this.state.showModal);
    }
  }

  handleImageChange(event) {
    var that = this;
    event.preventDefault();
    const file = event.target.files[0];

    // TODO: don't remove it false as temporary solution for skip this code
    if (false && isIOS) {
      //rotate image https://github.com/mosch/react-avatar-editor/issues/123 // Apple fixed the bug so the code is not needed. therefore, disabled.
      EXIF.getData(file, function () {
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        var orientation = EXIF.getTag(this, "Orientation");
        let rotatePic = 0;
        switch (orientation) {
          case 8:
            rotatePic = 270;
            break;
          case 6:
            rotatePic = 90;
            break;
          case 3:
            rotatePic = 180;
            break;
          default:
            rotatePic = 0;
        }
        that.setState({ rotate: rotatePic });
      });
    }

    if (ALLOWED_TYPES.includes(file.type)) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          loadedImg: reader.result,
          showModal: true
        });
      };

      reader.readAsDataURL(file);
    } else {
      this.setState({
        loadedImg: "",
        showModal: false
      });
      this.openModalMessage();
    }
    this.file.value = null;
  }

  openModalMessage = () => this.setState({ isModalMessageOpened: true });

  closeModalMessage = () => this.setState({ isModalMessageOpened: false });

  handleZoom = e => {
    this.setState({
      zoomValue: e.target.value
    });
  };

  cancelModal = () => {
    this.toggleModal();
    this.file.click();
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  onClickSave = () => {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
      const { isClub, isAgency, input, entityId } = this.props;
      const croppedImg = canvasScaled.toDataURL("image/png");
      const data = {
        origin: this.state.loadedImg.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        cropped: {
          croppedSize: `${canvasScaled.width}x${canvasScaled.height}`,
          src: croppedImg.replace(/^data:image\/(png|jpg);base64,/, "")
        },
        avatarUrl: croppedImg,
        entityId: entityId
      };
      this.setState(() => ({ previewImg: croppedImg }));

      // Don't send request if Editor is a part of redux-form
      if (input && input.onChange) {
        input.onChange(data);
        this.toggleModal();
        return;
      }

      if (isClub) {
        this.props.uploadClubAvatar(data);
      } else if (isAgency) {
        this.props.uploadAgencyAvatar(data);
      } else {
        this.props.uploadAvatar(data);
      }
      this.toggleModal();
    }
  };

  setEditorRef = editor => {
    this.editor = editor;
  };

  render() {
    const { loadedImg, showModal, zoomValue, previewImg, isModalMessageOpened } = this.state;
    const { size, edit, entityId, entityName, role, label: customLabel, disableLink } = this.props;
    const ccn = getClassName("Avatar-editor");
    const modify = addModifierTo(ccn());

    // console.log('entityId:', entityId)
    // console.log('entityName:', entityName)
    // console.log('previewImg:', previewImg)

    return (
      <div
        className={cx(ccn(), {
          [modify("middle")]: size === "middle",
          [modify("large")]: size === "large",
          [modify("small")]: size === "small",
          [modify("extrasmall")]: size === "extrasmall",
          [modify("no-border")]: previewImg
        })}
      >
        <div className={ccn("preview")}>
          <Avatar
            entityId={entityId}
            entityName={entityName}
            role={role}
            avatarUrl={previewImg}
            refreshEveryTime={true}
            disableLink={disableLink}
          />
        </div>
        {edit && (
          <div className={ccn("edit")}>
            <label htmlFor="img">
              <input
                id="img"
                type="file"
                ref={file => {
                  this.file = file;
                }}
                onChange={event => this.handleImageChange(event)}
                {...(isXamarinApp ? {} : { accept: ".png, .jpg, .jpeg" })}
              />
              <div className={ccn("text")}>{customLabel || <img src={changeIcon} alt="change avater" />}</div>
            </label>
            <Modal opened={isModalMessageOpened} onClose={this.closeModalMessage}>
              <div className={ccn("modal-msg")}>
                <FormattedMessage
                  id="uploadAvatarFormatErrorMessage"
                  defaultMessage="You can upload only jpg or png image format"
                />
                <Button primary={true} onClick={this.closeModalMessage} className={ccn("modal-msg-btn")}>
                  <FormattedMessage id="confirmOk" defaultMessage="Ok" />
                </Button>
              </div>
            </Modal>
          </div>
        )}

        <Editor
          showModal={showModal}
          setEditorRef={this.setEditorRef}
          imagePreviewUrl={loadedImg}
          zoomValue={zoomValue}
          handleZoom={this.handleZoom}
          onClickSave={this.onClickSave}
          cancelModal={this.cancelModal}
          rotate={this.state.rotate}
        />
      </div>
    );
  }
}
export default injectIntl(connect(null, { uploadAvatar, uploadClubAvatar, uploadAgencyAvatar })(AvatarEditor));
