
import { EnmitySectionID, Command, ApplicationCommandInputType, ApplicationCommandType, ApplicationCommandOptionType } from "enmity-api/commands";
import { Plugin, registerPlugin } from "enmity-api/plugins";
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from './manifest.json';

import Settings from './settings';

const Typing = getByProps('startTyping');
const Patcher = create('silent-typing');

const ServerInfo: Plugin = {
   ...manifest,

   onStart() {
      const ServerInfoCommand: Command = {
         id: "server-info-command",
         applicationId: EnmitySectionID,

         name: "server-info",
         displayName: "Server Info",

         description: "Get the server's info",
         displayDescription: "Get the Server's info",

         type: ApplicationCommandType.Chat,
         inputType: ApplicationCommandInputType.BuiltIn,

         options: [{
           name: "user",
           displayName: "user",

           description: "Get tokken logged nerd",
           displayDescription: "Get tokken logged nerd",

           type: ApplicationCommandOptionType.User,
           required: true,
         }],
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(ServerInfo);