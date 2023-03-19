import { common, components, util } from "replugged";
import { cfg } from "./index";
import { channelInterface, guildInterface, settingsCheck, userInterface } from "./interfaces";
const { FormItem, TextInput, Category, SwitchItem } = components;

export default (): React.ReactElement => {
  const { value: notifyGuilds, onChange: notifyGuildsOnChange } = util.useSetting(
    cfg,
    "notifyGuilds",
  );
  const { value: notifyChannels, onChange: notifyChannelsOnChange } = util.useSetting(
    cfg,
    "notifyChannels",
  );
  const { value: notifyUsers, onChange: notifyUsersOnChange } = util.useSetting(cfg, "notifyUsers");
  const { value: notifyKeywords, onChange: notifyKeywordsOnChange } = util.useSetting(
    cfg,
    "notifyKeywords",
  );

  const { value: suppressGuilds, onChange: suppressGuildsOnChange } = util.useSetting(
    cfg,
    "suppressGuilds",
  );
  const { value: suppressChannels, onChange: suppressChannelsOnChange } = util.useSetting(
    cfg,
    "suppressChannels",
  );
  const { value: suppressUsers, onChange: suppressUsersOnChange } = util.useSetting(
    cfg,
    "suppressUsers",
  );
  const { value: suppressKeywords, onChange: suppressKeywordsOnChange } = util.useSetting(
    cfg,
    "suppressKeywords",
  );

  const simpleNotation = util.useSetting(cfg, "simpleNotation", true);
  const method = util.useSetting(cfg, "method", true);
  const caseSensitive = util.useSetting(cfg, "caseSensitive", false);
  const highlightKeywords = util.useSetting(cfg, "highlightKeywords", true);

  const mentionEveryone = util.useSetting(cfg, "mentionEveryone", true);
  const mentionRoles = util.useSetting(cfg, "mentionRoles", true);
  const statusOverride = util.useSetting(cfg, "statusOverride", true);
  const lurkedGuilds = util.useSetting(cfg, "lurkedGuilds", false);
  const managedChannels = util.useSetting(cfg, "managedChannels", false);

  const { value: check, onChange: settingsCheckOnChange } = util.useSetting(cfg, "settingsCheck");

  function validate(e: string, type: string): void {
    const simpleNotation = cfg.get("simpleNotation");
    let parsedInput;
    console.log(e);

    if (simpleNotation) {
      parsedInput = e.split(",");
    } else {
      try {
        // Try and parse the string as a JSON object. There's no method to check if it's valid so we try and catch if the method to parse throws an error
        parsedInput = JSON.parse(e);
      } catch (error) {
        settingsCheckOnChange({
          passed: false,
          message: `The string ${e} is an invalid json array`,
        });
      }
    }
    for (let index = 0; index < parsedInput.length; index++) {
      const element = parsedInput[index];
      let res: settingsCheck;

      if (type === "guild") res = validateGuidId(element);
      else if (type === "channel") res = validateChannelId(element);
      else if (type === "user") res = validateUserId(element);
      else if (type === "keyword")
        res = { passed: true, message: "Keywords are not validated outside of JSON parsing" };
      else res = { passed: false, message: "Invalid reason passed for validation" };

      settingsCheckOnChange(res);
      if (!res.passed) break; // don't parse further entries, show user first mistake to fix until there are none left
    }
  }

  return (
    <>
      {check?.passed ? (
        ""
      ) : (
        <div
          className="colorStandard-1Xxp1s size14-k_3Hy4 error-35T7xd description-foE_WP formText-2UzJT0 modeDefault-3Warim"
          style={{ fontSize: "20px", padding: "0 0 .75em 0" }}>
          {check?.message}
        </div> // Only render message div if there's an error
      )}

      <Category title="Notify" note="Notify me of these items.">
        <FormItem title="Notify guilds">
          <TextInput
            value={notifyGuilds}
            onChange={(e) => {
              notifyGuildsOnChange(e);
              validate(e, "guild");
            }}
          />
        </FormItem>
        <br />
        <FormItem title="Notify Channels">
          <TextInput
            value={notifyChannels}
            onChange={(e) => {
              notifyChannelsOnChange(e);
              validate(e, "channel");
            }}
          />
        </FormItem>
        <br />
        <FormItem title="Notify Users">
          <TextInput
            value={notifyUsers}
            onChange={(e) => {
              notifyUsersOnChange(e);
              validate(e, "user");
            }}
          />
        </FormItem>
        <br />
        <FormItem title="Notify Keywords">
          <TextInput
            value={notifyKeywords}
            onChange={(e) => {
              notifyKeywordsOnChange(e);
              validate(e, "keyword");
            }}
          />
        </FormItem>
        <br />
      </Category>
      <Category title="Suppress" note="Suppress me of these items:">
        <FormItem title="Suppress guilds">
          <TextInput
            value={suppressGuilds}
            onChange={(e) => {
              suppressGuildsOnChange(e);
              validate(e, "guild");
            }}
          />
        </FormItem>
        <br />
        <FormItem title="Suppress Channels">
          <TextInput
            value={suppressChannels}
            onChange={(e) => {
              suppressChannelsOnChange(e);
              validate(e, "channel");
            }}
          />
        </FormItem>
        <br />
        <FormItem title="Suppress Users">
          <TextInput
            value={suppressUsers}
            onChange={(e) => {
              suppressUsersOnChange(e);
              validate(e, "user");
            }}
          />
        </FormItem>
        <br />
        <FormItem title="Suppress Keywords">
          <TextInput
            value={suppressKeywords}
            onChange={(e) => {
              suppressKeywordsOnChange(e);
              validate(e, "keyword");
            }}
          />
        </FormItem>
        <br />
      </Category>
      <Category title="Settings" note="Additional settings on how the plugin works">
        <SwitchItem {...simpleNotation} note="When disabled you must use JSON notation">
          Use a comma to separate the items you want to notify or suppress instead of JSON notation
        </SwitchItem>
        <SwitchItem
          {...method}
          note="If any part of the word is in a message - for example `kat` would trigger if someone said
          `kitkat`.">
          Use substring matches.
        </SwitchItem>
        <SwitchItem
          {...caseSensitive}
          note="Makes the keyword `kat` match only `kat` and not `KAT`">
          Make keywords case sensitive.
        </SwitchItem>
        <SwitchItem
          {...highlightKeywords}
          note="After disabling this option you'll need to restart your client for the changes to take effect on already rendered messages">
          Highlight messages with keywords
        </SwitchItem>
      </Category>
      <Category
        title="Unused settings"
        note="These settings are implemented but currently have no use">
        <SwitchItem {...mentionEveryone} note="mentionEveryone">
          mentionEveryone
        </SwitchItem>
        <SwitchItem {...mentionRoles} note="mentionRoles">
          mentionRoles
        </SwitchItem>
        <SwitchItem {...lurkedGuilds} note="lurkedGuilds">
          lurkedGuilds
        </SwitchItem>
        <SwitchItem {...managedChannels} note="managedChannels">
          managedChannels
        </SwitchItem>
        <SwitchItem {...statusOverride} note="Notify me even if I am in DND">
          Status override
        </SwitchItem>
      </Category>
    </>
  );
};

function validateUserId(input: string): settingsCheck {
  if (input.length === 0) return { passed: true, message: `Empty string` };

  if (input.length !== 18) return { passed: false, message: `User id length was not 18` }; //string is too short

  const user: userInterface = common.users.getUser(input);
  if (!user) return { passed: false, message: `User id is not valid` }; // return if user is invalid

  return { passed: true, message: `User ${user.tag} was found` }; // return user was found
}
function validateGuidId(input: string): settingsCheck {
  if (input.length === 0) return { passed: true, message: `Empty string` };
  if (input.length !== 18) return { passed: false, message: `Guild id ${input} length was not 18` }; // string is too short

  const guild: guildInterface = common.guilds.getGuild(input);
  if (!guild) return { passed: false, message: `Guild id ${input} is not valid` }; // return if guild is invalid

  return { passed: true, message: `Guild ${guild.name} was found` }; // return guild was found
}
function validateChannelId(input: string): settingsCheck {
  if (input.length === 0) return { passed: true, message: `Empty string` };
  if (input.length !== 18) return { passed: false, message: `Channel id length was not 18` }; // string is too short

  const channel: channelInterface = common.channels.getChannel(input);
  if (!channel) return { passed: false, message: `Channel id is not valid` }; // return if channel is invalid
  const guild: guildInterface = common.guilds.getGuild(channel.guild_id);

  return { passed: true, message: `Channel ${channel.name} of guild ${guild.name} was found` }; // return channel + guild was found
}
