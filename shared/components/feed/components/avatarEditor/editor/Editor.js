import React from "react";
import AvatarEditor from "react-avatar-editor";
import { FormattedMessage } from "react-intl";
import { Modal, Button } from "ui-kit/components";

import "./Editor.scss";

const Editor = props => (
  <Modal opened={props.showModal} className="Editor" onClose={props.onClose}>
    <header>
      <h3>
        <FormattedMessage id="loadAvatarTitle" defaultMessage="Profile photo" />
      </h3>
    </header>
    <main>
      <div className="img-wrapper">
        <AvatarEditor
          ref={props.setEditorRef}
          image={props.imagePreviewUrl}
          width={200}
          height={200}
          border={5}
          borderRadius={100}
          scale={1 + props.zoomValue / 100}
          rotate={props.rotate}
        />
      </div>
      <h4>
        <FormattedMessage id="editAvatarHint" defaultMessage="drag to reposition photo" />
      </h4>
      <div className="zoom-controller">
        <label htmlFor="zoom">
          <FormattedMessage id="zoomAvatar" defaultMessage="zoom" />
        </label>
        <input
          type="range"
          id="zoom"
          onChange={e => props.handleZoom(e)}
          defaultValue={props.zoomValue}
          min="0"
          max="100"
        />
      </div>
    </main>
    <footer>
      <Button onClick={props.changeImage}>
        <FormattedMessage id="changePhoto" defaultMessage="Change photo" />
      </Button>
      <Button className="apply" primary="true" onClick={props.onClickSave}>
        <FormattedMessage id="applyAvatar" defaultMessage="Apply" />
      </Button>
    </footer>
  </Modal>
);

export default Editor;
