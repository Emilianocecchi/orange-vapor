Okay, here is a Python script that implements the "Campaign Trail: Simplified" game. You can save this code as a .py file (e.g., campaign_game.py) and run it from your terminal using python campaign_game.py.

import random
import time
import os # Used for clearing the screen (optional)

# --- Game Constants ---
STARTING_APPROVAL = 40
STARTING_PC = 50
STARTING_OPPONENT_APPROVAL = 40
TURN_LIMIT = 10
WIN_THRESHOLD = 50

# Action Costs & Effects
RALLY_COST = 10
RALLY_EFFECT = 5

FUNDRAISE_EFFECT = 15

ATTACK_AD_COST = 15
ATTACK_AD_EFFECT_OPPONENT = -6
ATTACK_AD_BACKLASH_CHANCE = 0.25 # 25% chance
ATTACK_AD_BACKLASH_EFFECT = -2

POLICY_COST = 8
POLICY_EFFECT_SELF = 3
POLICY_PC_GAIN = 5

# Opponent AI Action Effects (simplified for this simulation)
OPP_RALLY_EFFECT = 4        # Slightly less effective rally assumed
OPP_ATTACK_AD_EFFECT = -5   # Slightly less effective attack ad assumed
OPP_POLICY_EFFECT = 2       # Slightly less effective policy assumed

# Random Event Constants
RANDOM_EVENT_CHANCE = 0.20 # 20% chance per turn

# --- Helper Functions ---

def clear_screen():
    """Clears the terminal screen."""
    # os.name is 'posix' for Linux/macOS, 'nt' for Windows
    os.system('cls' if os.name == 'nt' else 'clear')

def clamp(value, min_val, max_val):
    """Restricts a value to be within a minimum and maximum."""
    return max(min_val, min(value, max_val))

def display_status(turn, approval, pc, opponent_approval):
    """Displays the current game status."""
    print("-" * 30)
    print(f"Turn: {turn}/{TURN_LIMIT}")
    print(f"Your Approval:   {approval}%")
    print(f"Opponent Approval: {opponent_approval}%")
    print(f"Political Capital (PC): {pc}")
    print("-" * 30)

def get_player_action(pc):
    """Gets the player's action choice, ensuring validity and affordability."""
    actions = {
        1: {"name": "Hold a Rally", "cost": RALLY_COST},
        2: {"name": "Fundraise", "cost": 0},
        3: {"name": "Run Attack Ad", "cost": ATTACK_AD_COST},
        4: {"name": "Policy Announcement", "cost": POLICY_COST},
    }

    print("Choose your action:")
    for key, action in actions.items():
        print(f"{key}. {action['name']} (Cost: {action['cost']} PC)")

    while True:
        try:
            choice = int(input("Enter action number (1-4): "))
            if choice in actions:
                if actions[choice]["cost"] <= pc:
                    return choice
                else:
                    print("Not enough PC for that action! Choose again.")
            else:
                print("Invalid choice. Please enter a number between 1 and 4.")
        except ValueError:
            print("Invalid input. Please enter a number.")

# --- Main Game Logic ---

def run_game():
    """Runs the main game loop."""
    # Initialize game state
    player_approval = STARTING_APPROVAL
    player_pc = STARTING_PC
    opponent_approval = STARTING_OPPONENT_APPROVAL
    current_turn = 1

    clear_screen()
    print("Welcome to Campaign Trail: Simplified!")
    print(f"Goal: Reach over {WIN_THRESHOLD}% approval by the end of Turn {TURN_LIMIT}.\n")
    input("Press Enter to start...")

    # Game Loop
    while current_turn <= TURN_LIMIT:
        clear_screen()
        display_status(current_turn, player_approval, player_pc, opponent_approval)

        # --- Random Event Phase ---
        print("Checking for random events...")
        time.sleep(1) # Pause for suspense
        if random.random() < RANDOM_EVENT_CHANCE:
            event_type = random.choice(["good_press", "scandal", "opp_gaffe", "economy", "donation"])
            print("*" * 10 + " RANDOM EVENT! " + "*" * 10)
            if event_type == "good_press":
                print("Favorable media coverage boosts your image!")
                player_approval += 3
            elif event_type == "scandal":
                print("A minor scandal hits your campaign!")
                player_approval -= 4
            elif event_type == "opp_gaffe":
                print("Your opponent made an embarrassing gaffe!")
                opponent_approval -= 3
            elif event_type == "economy":
                if player_approval >= opponent_approval:
                    print("Positive economic news reflects well on you (as frontrunner)!")
                    player_approval += 2
                else:
                    print("Positive economic news helps your opponent!")
                    opponent_approval += 2
                # Could add negative economic news too for more variety
            elif event_type == "donation":
                print("An unexpected large donation has arrived!")
                player_pc += 10
            print("*" * 35)
            time.sleep(2.5) # Pause to read event
        else:
            print("No major events this turn.")

        # Clamp approval ratings after events
        player_approval = clamp(player_approval, 0, 100)
        opponent_approval = clamp(opponent_approval, 0, 100)

        # Update display if stats changed due to event
        if 'event_type' in locals() and event_type is not None: # Check if event occurred
             print("\nUpdated Status after Event:")
             display_status(current_turn, player_approval, player_pc, opponent_approval)
             event_type = None # Reset for next loop

        # --- Player Action Phase ---
        action_choice = get_player_action(player_pc)

        if action_choice == 1: # Rally
            print("\nYou hold a rousing rally!")
            player_pc -= RALLY_COST
            player_approval += RALLY_EFFECT
            print(f"Your approval increased by {RALLY_EFFECT}%.")
        elif action_choice == 2: # Fundraise
            print("\nYou spend time fundraising.")
            player_pc += FUNDRAISE_EFFECT
            print(f"You gained {FUNDRAISE_EFFECT} PC.")
        elif action_choice == 3: # Attack Ad
            print("\nYou run a negative attack ad against your opponent.")
            player_pc -= ATTACK_AD_COST
            opponent_approval += ATTACK_AD_EFFECT_OPPONENT
            print(f"Opponent's approval decreased by {-ATTACK_AD_EFFECT_OPPONENT}%.")
            if random.random() < ATTACK_AD_BACKLASH_CHANCE:
                print("!! BACKLASH !! The ad was seen as too negative!")
                player_approval += ATTACK_AD_BACKLASH_EFFECT
                print(f"Your own approval decreased by {-ATTACK_AD_BACKLASH_EFFECT}%.")
        elif action_choice == 4: # Policy Announcement
            print("\nYou announce a new popular policy initiative.")
            player_pc -= POLICY_COST
            player_approval += POLICY_EFFECT_SELF
            player_pc += POLICY_PC_GAIN
            print(f"Your approval increased by {POLICY_EFFECT_SELF}%, and you gained {POLICY_PC_GAIN} PC from positive reception.")

        # Clamp approval ratings after player action
        player_approval = clamp(player_approval, 0, 100)
        opponent_approval = clamp(opponent_approval, 0, 100)

        print(f"\nEnd of your action: PC={player_pc}, Approval={player_approval}%\n")
        time.sleep(2) # Pause

        # --- Opponent Action Phase ---
        print("Opponent is making their move...")
        time.sleep(1.5)

        # Simple AI logic
        if opponent_approval < player_approval:
            # Opponent is behind, more likely to attack or rally
            opponent_action = random.choices(
                ["rally", "attack", "policy"], weights=[50, 30, 20], k=1
            )[0]
        else:
            # Opponent is ahead or tied, more balanced approach
             opponent_action = random.choices(
                ["rally", "attack", "policy"], weights=[40, 40, 20], k=1
            )[0]

        if opponent_action == "rally":
            print("Your opponent held a large rally!")
            opponent_approval += OPP_RALLY_EFFECT
            print(f"Their approval increased by {OPP_RALLY_EFFECT}%.")
        elif opponent_action == "attack":
            print("Your opponent ran an attack ad against you!")
            player_approval += OPP_ATTACK_AD_EFFECT
            print(f"Your approval decreased by {-OPP_ATTACK_AD_EFFECT}%.")
        elif opponent_action == "policy":
            print("Your opponent announced a policy.")
            opponent_approval += OPP_POLICY_EFFECT
            print(f"Their approval increased slightly by {OPP_POLICY_EFFECT}%.")

        # Clamp approval ratings after opponent action
        player_approval = clamp(player_approval, 0, 100)
        opponent_approval = clamp(opponent_approval, 0, 100)

        print("-" * 30)
        input("Press Enter to continue to the next turn...")

        # --- End of Turn ---
        current_turn += 1

    # --- Game End ---
    clear_screen()
    print("*" * 30)
    print("          ELECTION DAY!")
    print("*" * 30)
    print("\nFinal Results:")
    print(f"Your Final Approval:   {player_approval}%")
    print(f"Opponent Final Approval: {opponent_approval}%")
    print("-" * 30)

    if player_approval > WIN_THRESHOLD:
        # Check if player also beat the opponent, just for flavor
        if player_approval > opponent_approval:
             print("CONGRATULATIONS! You have won the election!")
        else:
             print(f"You reached over {WIN_THRESHOLD}% approval, but barely! You've won the election... technically!")
             print("(Your opponent actually finished with higher approval, but the goal was >50%)")

    else:
        print("You lost the election. Your approval wasn't high enough.")
        if opponent_approval > player_approval:
            print("Your opponent secured a clear victory.")
        else:
            print("It was close, but ultimately not enough.")

    print("\nThank you for playing Campaign Trail: Simplified!")

# --- Run the game ---
if __name__ == "__main__":
    run_game()


How to Play:

Save: Save the code above as a Python file (e.g., campaign_game.py).

Open Terminal: Open your command prompt (Windows) or terminal (macOS/Linux).

Navigate: Use the cd command to go to the directory where you saved the file.

Run: Type python campaign_game.py and press Enter.

Follow Prompts: The game will guide you through each turn, asking for your action (by number) and showing the results and opponent's moves.

Enjoy your campaign!
