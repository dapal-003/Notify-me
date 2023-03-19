import { common, components } from "replugged";
import { ErrorBoundary } from "./ErrorBoundary";
import { channelModule, getActivator, transitionTo } from "./index";
import { channelObject, messageObj } from "./interfaces";
import "./styles.css";

const { Tooltip } = components;

interface MessageCardProps {
  key: number;
  messageObject: messageObj;
  onClose?(): void;
  closeAll?(): void;
}

export type MessageCardType = React.FC<MessageCardProps>;

export default ((props) => {
  const { name } = channelModule.getChannel(props.messageObject.channel_id) as channelObject;
  const guildName = props.messageObject.guild_id
    ? common.guilds.getGuild(props.messageObject.guild_id).name
    : "DMs";
  const avatar = `https://cdn.discordapp.com/avatars/${props.messageObject.author.id}/${props.messageObject.author.avatar}.webp?size=100`;
  const activationReason = getActivator(props.messageObject);

  return (
    <ErrorBoundary>
      <div className="outerBox">
        <div className="headerBar">
          <img className="avatar-2e8lTP avatar" src={avatar} />
          <div className="origin">
            {guildName} - {name} <br />
            {props.messageObject.author.display_name ??
              `${props.messageObject.author.username}#${props.messageObject.author.discriminator}`}
          </div>
          <div className="headerButtons">
            {/* Todo: Fix this tooltip not working */}
            <Tooltip
              className="close-A4ZfTI button-ejjZWC heading-lg-semibold-14ouVv"
              text={activationReason}>
              ?
            </Tooltip>
            <div
              className="close-A4ZfTI button-ejjZWC"
              onClick={() => {
                if (props.onClose) props.onClose();
              }}>
              <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="contentBody">
          <div className="content">
            {props.messageObject.content
              ? props.messageObject.content
              : `Uploaded ${props.messageObject.attachments.length} pieces of media`}
          </div>
          <div className="footerBar">
            <div
              className="button-ejjZWC lookOutlined-3RTC7c colorGreen-jIPCAS jumpButton"
              onClick={() => {
                transitionTo(
                  `/channels/${props.messageObject.guild_id ?? "@me"}/${
                    props.messageObject.channel_id
                  }/${props.messageObject.id}`,
                );
                if (props.onClose) props.onClose();
              }}>
              Jump to message
            </div>
            <div
              className="button-ejjZWC lookOutlined-3RTC7c colorRed-2VFhM4 closeAllButton"
              onClick={() => {
                if (props.closeAll) props.closeAll();
              }}>
              Close all
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}) as MessageCardType;
