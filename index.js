// Import necessary modules from Enmity API
const { Plugin } = require('enmity');

class ServerInfoPlugin extends Plugin {
    constructor() {
        super({
            name: 'ServerInfoPlugin',
            description: 'Displays server information with /serverinfo command',
            version: '1.0.0'
        });
    }

    // Initialize the plugin
    start() {
        console.log('ServerInfoPlugin started!');

        // Register the /serverinfo command
        this.registerCommand('/serverinfo', this.handleServerInfoCommand);
    }

    // Handle the /serverinfo command
    async handleServerInfoCommand() {
        try {
            const guild = this.getGuild(); // Method to get the current guild
            if (!guild) {
                return this.sendMessage('Unable to retrieve server information.');
            }

            const serverInfo = `
                **Server Name:** ${guild.name}
                **Member Count:** ${guild.memberCount}
                **Region:** ${guild.region}
                **Creation Date:** ${new Date(guild.createdAt).toLocaleDateString()}
            `;

            this.sendMessage(serverInfo); // Method to send a message
        } catch (error) {
            console.error('Error handling /serverinfo command:', error);
            this.sendMessage('An error occurred while retrieving server information.');
        }
    }

    // Cleanup when the plugin is stopped
    stop() {
        console.log('ServerInfoPlugin stopped!');
        this.unregisterCommand('/serverinfo'); // Unregister the command
    }
}

// Export the plugin class
module.exports = new ServerInfoPlugin();
