class MacroData {
    constructor() {
    }

    types = {
        triggers: 'Triggers',
        actions: 'Actions',
        constraints: 'Constraints',
        // TODO : Add more tiles in needed
    };

    categories = {
        applications: {
            name: "Applications",
            subCategories: {
                app: {
                    name: "App Install/Remove/Update",
                    options: {
                        installed: "Application Installed",
                        removed: "Application Removed",
                        updated: "Application Updated",
                        subOptions: {
                            anyApp: "Any Application",
                            selectApps: "Select Application(s)",
                        }
                    }
                }
            }
        },
        connectivity: {
            name: "Connectivity",
            subCategories: {
                airplaneMode: {
                    name: "Airplane Mode On/Off",
                    options: {
                        rootOnly: "Root Only",
                        default: "MacroDroid as Default Assist App",
                    }
                },
                autoSync: {
                    name: "Auto Sync On/Off",
                    options: {
                        on: "Auto Sync On",
                        off: "Auto Sync Off",
                        toggle: "Auto Sync Toggle"
                    }
                },
            }
        },
        deviceState: {
            name: "Device State",
            subCategories: {
                airplaneMode: {
                    name: "Airplane Mode",
                    options: {
                        enable: 'Airplane Mode Enabled',
                        disable: 'Airplane Mode Disabled',
                    }
                }
            }
        },
        logging: {
            name: "Logging",
            subCategories: {
                clearLog: {
                    name: "Clear Log",
                    options: {
                        user: "User Log",
                        system: "System Log",
                    }
                },
                openMacroDroidLog: {
                    name: "Open MacroDroid Log",
                    options: {
                        user: "User Log",
                        system: "System Log",
                    }
                }
            }
        },
        notification: {
            name: "Notification",
            subCategories: {
                notificationVolume: {
                    name: "Notification Volume",
                    options: {
                        on: "Volume On",
                        silent: 'Silent',
                    }
                }
            }
        },
    };
}

export default new MacroData()
