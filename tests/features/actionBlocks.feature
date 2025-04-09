@actionBlocks
Feature: Add Action Blocks

    @TC002
    Scenario Outline: Add Action Blocks Successfully
        Given User is at Home screen
        Given User accesses tile "actionBlocks"
        Given User is at Action Blocks Listing screen
        When User goes to Adding New Action Blocks screen
        When User inputs basic info for the block:
        """
        {
            "name": "<blockName>",
            "description": "<blockDescription>"
        }
        """
        And User adds Input Variables with values:
        """
        {
            "name": "Testing Input Var",
            "type": "Boolean",
            "value": "True"
        }
        """
        And User adds Actions with values:
        """
        {
            "name": "Logging",
            "subCategory": {
                "name": "Clear Log",
                "option": "System Log"
            }
        }
        """
        And User adds Output Variables with values:
        """
        {
            "name": "Testing Output Var",
            "type": "String",
            "value": "This is a testing string"
        }
        """
        Then User can see added Actions values
        Then User can see the added Input Variables
        Then User can see the added Output Variables
        When User save the changes of the block
        Then User can see the Action Blocks:
        """
        {
            "name": "<blockName>",
            "description": "<blockDescription>"
        }
        """
        * User go back and skip ads if any

        Examples:
            | blockName             | blockDescription                  |
            | Testing Block Name 1  | This is a testing action block 1  |
#            | Testing Block Name 2  | This is a testing action block 2  |
#            | Testing Block Name 3  | This is a testing action block 3  |

    @TC004
    Scenario Outline: Delete Action Blocks Successfully
        Given User is at Home screen
        Given User accesses tile "actionBlocks"
        Given User is at Action Blocks Listing screen
        When User deletes the block "<blockName>"
        Then User cannot see the Action Blocks:
        """
        {
            "name": "<blockName>"
        }
        """
        When User go back and skip ads if any

        Examples:
            | blockName                |
            | Testing Block Name 1     |
#            | Testing Block Name 2     |
#            | Testing Block Name 3     |