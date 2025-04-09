@macro
Feature: Add Macro

    @TC001
    Scenario Outline: Add Macro Manually Without Name
        Given User is at Home screen
        Given User accesses tile "addMacro"
        When User adds Triggers with values:
        """
        {
            "name": "Applications",
            "subCategory": {
                "name": "App Install/Remove/Update",
                "option": "<appOption>"
            }
        }
        """
        Then User can see added Triggers values
        When User adds Actions with values:
        """
        {
            "name": "Logging",
            "subCategory": {
                "name": "Clear Log",
                "option": "System Log"
            }
        }
        """
        Then User can see added Actions values
        When User adds Constraints with values:
        """
        {
            "name": "Device State",
            "subCategory": {
                "name": "Airplane Mode",
                "option": "Airplane Mode Disabled"
            }
        }
        """
        Then User can see added Constraints values
        When When User adds local variable with values:
        """
        {
            "name": "Test Case",
            "type": "Integer",
            "value": "1"
        }
        """
        Then User can see added local variables values
        Then User go back and discard changes

        Examples:
            | appOption                 |
            | Application Removed       |
            | Application Updated       |
            | Application Installed     |

  @TC003
  Scenario: Add Multi Categories to Macros Without Name
    Given User is at Home screen
    Given User accesses tile "addMacro"
    When User adds Triggers with values:
        """
        [{
            "name": "Applications",
            "subCategory": {
                "name": "App Install/Remove/Update",
                "option": "Application Installed"
            }
        },
        {
            "name": "Applications",
            "subCategory": {
                "name": "App Install/Remove/Update",
                "option": "Application Removed"
            }
        }]
        """
    Then User can see added Triggers values
    When User adds Actions with values:
        """
        [{
            "name": "Logging",
            "subCategory": {
                "name": "Clear Log",
                "option": "System Log"
            }
        },
        {
            "name": "Logging",
            "subCategory": {
                "name": "Open MacroDroid Log",
                "option": "User Log"
            }
        },
        {
            "name": "Connectivity",
            "subCategory": {
                "name": "Auto Sync On/Off",
                "option": "Auto Sync Off"
            }
        }]
        """
    Then User can see added Actions values
    When User adds Constraints with values:
        """
        {
            "name": "Notification",
            "subCategory": {
                "name": "Notification Volume",
                "option": "Silent"
            }
        }
        """
    Then User can see added Constraints values
    When When User adds local variable with values:
        """
        {
            "name": "Test Case",
            "type": "Decimal",
            "value": "1.36"
        }
        """
    Then User can see added local variables values