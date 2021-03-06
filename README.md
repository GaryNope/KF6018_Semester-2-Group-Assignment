# KF6018_A2_w16015149_w16019711_w16007006_w14015821

## Instructions
* Hub Area (Jordan Delaney w16015149)
  * Move hand onto the position of the balls to select a game to play
  * The instructions are also links to the pages to help with testing)
* Bowling Game (Cuthbert Mutumbwa w16019711)
  * Close hands to shoot barrage of balls to knock over the objects
  * Once hands close the game will count down, and once the countdown is hit the game will allow you to reset
  * Clap to reset game
  * Use mouse click to go back to main menu  
* Archery Game (Andrew Patton w16007006)
  * Bow is attached to your left hand
  * Touch your right shoulder with your right hand to get a new arrow
  * Touch your hands together to 'nock' the arrow
  * Touch your right shoulder again to fire
  * **Please Note:** The target placed closest to you is deiberately easy to hit for the purpose of testing collisions
  * Use slingring to go back to hub world (see proposed features for more info)
* Explosion Game (Luke Phillips w14015821)
  * Throw explosive by opening hands
  * Trigger explosion by clapping
  * Close hands to get a new exlosive

## Rendering Elements

* Trees, floor and targets all have textures
* Rainfall in hub world & archery game
* Fog effect in hub world & archery game
* Particle Effects on explosions (explosive minigame)

## Motion Sensing Features

* Detects hand open 
* Detects hand close
* Detects hand clapping
* Detects User touching Menu Spheres
* Detects contact between hand and shoulder

## User Performance Analysis

* Score updates when target is hit
* User is teleported back to the hub world after successful use of sling-ring

## Visual Feedback

* Arrow attaches to hand when user touches quiver
* Arrow fires forward when pulled back far enough
* Sparks fly off when using slingring
* Score updates when target is hit

## Student Proposed Features
### Jordan Delaney 16015149

* Moving targets using interpolation animation
* Target collision, including score updates and arrows sticking into targets
* Hub area which connects games together
* UI Features on hub area for insturctions and to link the features together
* Scene Setup, Models and Particles 

### Cuthbert Mutumbwa 16019711

* Projectile bowling Mini game
* In First Person View
* Ball projectile collides with objects within world space
* close hands to shoot barrage of balls to knock over the objects
* once hands close the game will count down, and once the countdown is hit the game will allow you to reset
* clap to reset game
* Use mouse click to go back to main menu

### Andrew Patton 16007006

* Archery minigame
  * Player can shoot targets with a bow&arrow
* Sling ring (Dr Strange)
  * Player can use circular motion to signal they want to return to the main menu (move right hand clockwise around left hand)

### Luke Phillips 14015821

* Explosion minigame
  * Player can throw explosives
  * Physics is simulated
