import type React from "react";
import { components, util } from "replugged";
import { cfg } from "./index";
const { FormItem, TextInput, Category, SwitchItem, FormText } = components;

export default (): React.ReactElement => {
  const notifyGuilds = util.useSetting(cfg, "notifyGuilds");
  const notifyChannels = util.useSetting(cfg, "notifyChannels");
  const notifyUsers = util.useSetting(cfg, "notifyUsers");
  const notifyKeyword = util.useSetting(cfg, "notifyKeywords");

  const suppressGuilds = util.useSetting(cfg, "suppressGuilds");
  const suppressChannels = util.useSetting(cfg, "suppressChannels");
  const suppressUsers = util.useSetting(cfg, "suppressUsers");
  const suppressKeyword = util.useSetting(cfg, "suppressKeywords");

  const method = util.useSetting(cfg, "method", true);
  const caseSensitive = util.useSetting(cfg, "caseSensitive", false);
  const highlightKeywords = util.useSetting(cfg, "highlightKeywords", true);

  const mentionEveryone = util.useSetting(cfg, "mentionEveryone", true);
  const mentionRoles = util.useSetting(cfg, "mentionRoles", true);
  const statusOverride = util.useSetting(cfg, "statusOverride", true);
  const lurkedGuilds = util.useSetting(cfg, "lurkedGuilds", false);
  const managedChannels = util.useSetting(cfg, "managedChannels", false);

  return (
    <>
      <Category title="Notify" note="Notify me of these items.">
        <FormText.LABEL_BOLD>
          Important! Items need to be in JSON array notation: ["1000926524452647132"]
        </FormText.LABEL_BOLD>
        <br />
        <FormItem title="Notify guilds">
          <TextInput {...notifyGuilds} />
        </FormItem>
        <br />
        <FormItem title="Notify Channels">
          <TextInput {...notifyChannels} />
        </FormItem>
        <br />
        <FormItem title="Notify Users">
          <TextInput {...notifyUsers} />
        </FormItem>
        <br />
        <FormItem title="Notify Keywords">
          <TextInput {...notifyKeyword} />
        </FormItem>
        <br />
      </Category>
      <Category title="Suppress" note="Suppress me of these items:">
        <FormText.LABEL_BOLD>
          Important! Items need to be in JSON array notation: ["1000926524452647132"]
        </FormText.LABEL_BOLD>
        <br />
        <FormItem title="Suppress guilds">
          <TextInput {...suppressGuilds} />
        </FormItem>
        <br />
        <FormItem title="Suppress Channels">
          <TextInput {...suppressChannels} />
        </FormItem>
        <br />
        <FormItem title="Suppress Users">
          <TextInput {...suppressUsers} />
        </FormItem>
        <br />
        <FormItem title="Suppress Keywords">
          <TextInput {...suppressKeyword} />
        </FormItem>
        <br />
      </Category>
      <Category title="Settings" note="Additional settings on how the plugin works">
        <SwitchItem
          {...method}
          note="If any part of the word is in a message - for example `kat` would trigger if someone said
          `kitkat`.">
          Use substring matches.
        </SwitchItem>
        <SwitchItem {...caseSensitive} note="Makes the keyword `kat` match both `KAT` and `kat`">
          Make keywords case sensitive.
        </SwitchItem>
        <SwitchItem
          {...highlightKeywords}
          note="Disabling this will make this addon appear more stealthy as there won't be highlights for notifications that don't normally exist.">
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
