import arcade
import os
SPRITE_SCALING = 1.0

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
SCREEN_TITLE = "Mario Frenzy"
SPRITE_PIXEL_SIZE = 128
GRID_PIXEL_SIZE = (SPRITE_PIXEL_SIZE * SPRITE_SCALING)

VIEWPORT_MARGIN = 50
RIGHT_MARGIN = 150

MOVEMENT_SPEED = 5
JUMP_SPEED = 14
GRAVITY = 0.5

def get_map(filename):
    map_file = open(filename)
    map_array = []
    for line in map_file:
        line = line.strip()
        map_row = line.split(",")
        for index, item in enumerate(map_row):
            map_row[index] = int(item)
        map_array.append(map_row)
    return map_array

class MarioFrenzy(arcade.Window):
    def __init__(self, width, height, title):
        super().__init__(width, height, title)
        self.player_list = None
        self.wall_list = None


        self.player_sprite = None
        self.score = 0

        self.physics_engine = None
        self.view_left = 0
        self.view_bottom = 0
        self.game_over = False



    def setup(self):
        self.player_list = arcade.SpriteList()
        self.wall_list = arcade.SpriteList()

        mario = "sprites/Mario5050.png"
        item_block = "sprites/ItemBlock5050.png"
        dirt = "sprites/dirt5050.png"
        breakable_block = "sprites/Block5050.png"

        self.player_sprite = arcade.Sprite("sprites/Mario5050.png", SPRITE_SCALING)
        self.player_sprite.center_x = 64
        self.player_sprite.center_y = 270
        self.player_list.append(self.player_sprite)

        map_array = get_map("level/World_1-1.csv")
        self.end_of_map = len(map_array[0]) * GRID_PIXEL_SIZE


        for row_index, row in enumerate(map_array):
            for column_index, item in enumerate(row):
                if item == 0:
                    continue
                elif item == 1:
                    wall = arcade.Sprite("sprites/dirt5050.png", SPRITE_SCALING)
                elif item == 2:
                    wall = arcade.Sprite("sprites/block5050.png", SPRITE_SCALING)
                elif item == 3:
                    wall = arcade.Sprite("sprites/ItemBlock5050.png", SPRITE_SCALING)

                wall.right = column_index*64
                wall.top = (row_index) * 64
                self.wall_list.append(wall)
        self.physics_engine = arcade.PhysicsEnginePlatformer(self.player_sprite, self.wall_list, gravity_constant= GRAVITY)
        arcade.set_background_color(arcade.color.AIR_FORCE_BLUE)
        self.view_left = 0
        self.view_bottom = 0

        self.game_over = False


    def on_draw(self):
        arcade.start_render()
        self.player_list.draw()
        self.wall_list.draw()

        distance = self.player_sprite.right
        output = f"Distance: {distance}"
        arcade.draw_text(output, self.view_left + 10, self.view_bottom + 20, arcade.color.WHITE, 14)
        if self.game_over:
            arcade.draw_text("Game Over", self.view_left + 200, self.view_bottom + 200, arcade.color.WHITE, 30)

    def update(self, delta_time):
        if self.player_sprite.right >= self.end_of_map:
            self.game_over = True

            if not self.game_over:
                self.physics_engine.update

        changed = False

        # Scroll left
        left_bndry = self.view_left + VIEWPORT_MARGIN
        if self.player_sprite.left < left_bndry:
            self.view_left -= left_bndry - self.player_sprite.left
            changed = True

        # Scroll right
        right_bndry = self.view_left + SCREEN_WIDTH - RIGHT_MARGIN
        if self.player_sprite.right > right_bndry:
            self.view_left += self.player_sprite.right - right_bndry
            changed = True

        # Scroll up
        top_bndry = self.view_bottom + SCREEN_HEIGHT - VIEWPORT_MARGIN
        if self.player_sprite.top > top_bndry:
            self.view_bottom += self.player_sprite.top - top_bndry
            changed = True

        # Scroll down
        bottom_bndry = self.view_bottom + VIEWPORT_MARGIN
        if self.player_sprite.bottom < bottom_bndry:
            self.view_bottom -= bottom_bndry - self.player_sprite.bottom
            changed = True

        # If we need to scroll, go ahead and do it.
        if changed:
            arcade.set_viewport(self.view_left,
                                SCREEN_WIDTH + self.view_left,
                                self.view_bottom,
                                SCREEN_HEIGHT + self.view_bottom)



    def on_key_press(self, key, key_modifiers):
        if key == arcade.key.UP:
            self.player_sprite.change_y = JUMP_SPEED
        elif key ==arcade.key.LEFT:
            self.player_sprite.change_x = -MOVEMENT_SPEED
        elif key == arcade.key.RIGHT:
            self.player_sprite.change_x = MOVEMENT_SPEED

    def on_key_release(self, key, key_modifiers):
        if key == arcade.key.UP or key == arcade.key.DOWN:
            self.player_sprite.change_y = 0
        elif key == arcade.key.LEFT or key == arcade.key.RIGHT:
            self.player_sprite.change_x = 0

def main():
    game = MarioFrenzy(SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_TITLE)
    game.setup()
    arcade.run()

if __name__ == "__main__":
    main()