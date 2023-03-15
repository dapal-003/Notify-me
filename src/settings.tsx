import type React from "react";
import { components, util } from "replugged";
import { cfg } from "./index";
const { FormItem, TextInput, Category, SwitchItem, FormText } = components;

//todo settings page
export default (): React.ReactElement => {
  const notifyGuilds = util.useSetting(cfg, "notifyGuilds");
  const notifyChannels = util.useSetting(cfg, "notifyChannels");
  const notifyUsers = util.useSetting(cfg, "notifyUsers");
  const notifyKeyword = util.useSetting(cfg, "notifyKeywords");

  const supressGuilds = util.useSetting(cfg, "supressGuilds");
  const supressChannels = util.useSetting(cfg, "supressChannels");
  const supressUsers = util.useSetting(cfg, "supressUsers");
  const supressKeyword = util.useSetting(cfg, "supressKeywords");

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
      <Category title="Supress" note="Supress me of these items:">
        <FormText.LABEL_BOLD>
          Important! Items need to be in JSON array notation: ["1000926524452647132"]
        </FormText.LABEL_BOLD>
        <br />
        <FormItem title="Supress guilds">
          <TextInput {...supressGuilds} />
        </FormItem>
        <br />
        <FormItem title="Supress Channels">
          <TextInput {...supressChannels} />
        </FormItem>
        <br />
        <FormItem title="Supress Users">
          <TextInput {...supressUsers} />
        </FormItem>
        <br />
        <FormItem title="Supress Keywords">
          <TextInput {...supressKeyword} />
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
          Make keywords case sensetive.
        </SwitchItem>
        <SwitchItem
          {...highlightKeywords}
          note="Dissabling this will make this addon appear more stealthy as there won't be highlights for notificatiosn that don't normally exist.">
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
