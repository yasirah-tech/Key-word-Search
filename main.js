kaboom()

loadSprite("bag", "bag.png")
loadSprite("ghosty", "ghosty.png")
loadSprite("grass", "grass.png")
loadSprite("steel", "steel.png")
loadSprite("door", "door.png")
loadSprite("key", "key.png")
loadSprite("honeychuckles", "honeychuckles.png")
loadSprite("bg", "bg.png")
loadSprite("milk", "milk.png")
loadSprite("water", "water.png")
loadSprite("cooler", "cooler.png")
loadSprite("sponsor", "sponsor.png")
loadSprite("bg", "bg.png")


scene("main", (levelIdx) => {

	const SPEED = 320

    const background = add ([
        sprite("bg", {width: width(), height: height()})
    ])
	// character dialog data
	const characters = {
		"a": {
			sprite: "bag",
			msg: "ohhi how are you?",
		},
		"b": {
			sprite: "ghosty",
			msg: "get out!",
		},
	}

	// level layouts
	const levels = [
		[
            "=====|===",
            "= w   o =",
            "= a     =",
            "= d  r  =",
            "=       =",
            "= $     =",
            "=    s  =",
            "=   @   =",
            "=========",
		],
		   ["---------",
            "-   l   -",
            "- e   t -",
            "-  $    -",
            "t    e  -",
            "- r     -",
            "-     s -",
            "-   @   -",
            "---------",
		],
	]

	addLevel(levels[levelIdx], {
		width: 300,
		height: 150,
		pos: vec2(64, 64),
        "w": () => [
            sprite("milk"),
            area(),
            solid(),
            pos(100,30),
            scale(4),
            "milk",
        ],
        "o": () => [
            sprite("water"),
            area(),
            solid(),
            pos(100,20),
            scale(2),
            "water",
        ],
        "r": () => [
        sprite("cooler"),
        area(),
        solid(),
        pos(100,30),
        scale(2),
        "cooler",
    ],
    "d": () => [
        sprite("sponsor"),
        area(),
        solid(),
        pos(100,30),
        scale(2),
        "sponsor",
    ],
		"=": () => [
			sprite("grass"),
			area(),
			solid(),
		],
		"-": () => [
			sprite("steel"),
			area(),
			solid(),
		],
		"$": () => [
			sprite("key"),
			area(),
			"key",
		],
		"@": () => [
			sprite("honeychuckles"),
			area(),
			solid(),
			"player",
		],
		"|": () => [
			sprite("door"),
			area(),
			solid(),
			"door",
		],
		// any() is a special function that gets called everytime there's a
		// symbole not defined above and is supposed to return what that symbol
		// means
		any(ch) {
			const char = characters[ch]
			if (char) {
				return [
					sprite(char.sprite),
					area(),
					solid(),
					"character",
					{ msg: char.msg, },
				]
			}
		},
	})

	// get the player game obj by tag
	const player = get("player")[0]
    const milk = get("milk")[0]
    const water = get("water")[0]
    const cooler = get("cooler")[0]
    // const sponsor = get("sponsor")[0]
	function addDialog() {
		const h = 160
		const pad = 16
		const bg = add([
			pos(0, height() - h),
			rect(width(), h),
			color(0, 0, 0),
			z(100),
		])
		const txt = add([
			text("", {
				width: width(),
			}),
			pos(0 + pad, height() - h + pad),
			z(100),
		])
		bg.hidden = true
		txt.hidden = true
		return {
			say(t) {
				txt.text = t
				bg.hidden = false
				txt.hidden = false
			},
			dismiss() {
				if (!this.active()) {
					return
				}
				txt.text = ""
				bg.hidden = true
				txt.hidden = true
			},
			active() {
				return !bg.hidden
			},
			destroy() {
				bg.destroy()
				txt.destroy()
			},
		}
	}

	let hasKey = false
	const dialog = addDialog()

	player.onCollide("key", (key) => {
		destroy(key)
		hasKey = true
	})

	player.onCollide("door", () => {
		if (hasKey) {
			if (levelIdx + 1 < levels.length) {
				go("main", levelIdx + 1)
			} else {
				go("win")
			}
		} else {
			dialog.say("you got no key!")
		}
	})

	// talk on touch
	player.onCollide("character", (ch) => {
		dialog.say(ch.msg)
	})
    wait(30, () => {
		destroy(milk)
	})

    wait(5, () => {
        destroy(water)
    } )

    wait(3, () => {
        destroy(cooler)
    } )

    wait(7, () => {
        destroy(cooler)
    } )



    player.onCollide("milk", () => {
        destroy(milk)
        score.value += 3
        score.text = "Score:" + score.value
    })
    player.onCollide("sponsor", () => {
        destroy(sponsor)
        score.value += 3
        score.text = "Score:" + score.value
    })
	const dirs = {
		"left": LEFT,
		"right": RIGHT,
		"up": UP,
		"down": DOWN,
	}

	for (const dir in dirs) {
		onKeyPress(dir, () => {
			dialog.dismiss()
		})
		onKeyDown(dir, () => {
			player.move(dirs[dir].scale(SPEED))
		})
	}

})

scene("win", () => {
	add([
		text("You Win!"),
		pos(width() / 2, height() / 2),
		origin("center"),
	])
})

go("main", 0)
// loadSprite("honeychuckles","honeychuckles.png")
// loadSprite("bag", "bag.png")
// loadSprite("ghosty", "ghosty.png")
// loadSprite("grass", "grass.png")
// loadSprite("steel", "steel.png")
// loadSprite("door", "door.png")
// loadSprite("key", "key.png")
// loadSprite("milk", "milk.png")
// loadSprite("water", "water.png")
// loadSprite("cooler", "cooler.png")
// loadSprite("sponsor", "sponsor.png")
// loadSprite("bg", "bg.png")


// scene("main", (levelIdx) => {
//     const SPEED = 320
//     const background = add ([
//         sprite("bg", {width: width(), height: height()})
//     ])
//     const score = add([
//         text("Score: 0"),
//         pos(24, 24),
//         { value: 0 },
//     ])
    
//     // character dialog data
//     const characters = {
//         "a": {
//             sprite: "bag",
//             msg: "ohhi how are you?",
//         },
//         "b": {
//             sprite: "ghosty",
//             msg: "get out!",
//         },
//     }

//     // level layouts
//     const levels = [
//         [
//             "=====|===",
//             "= w   o =",
//             "= a     =",
//             "= d  r  =",
//             "=       =",
//             "= $     =",
//             "=    s  =",
//             "=   @   =",
//             "=========",
//         ],
//         [
//             "---------",
//             "-   l   -",
//             "- e   t -",
//             "-  $    -",
//             "t    e  -",
//             "- r     -",
//             "-     s -",
//             "-   @   -",
//             "---------",
//         ],
//     ]
  
    
//     var words =["ability", "able", "aboard", "bank", "bat", "basket", "begun", "bare", "barn", "bark", "ball", "base", "belt", "balance"]
//     addLevel(levels[levelIdx], {
//         width: 300,
//         height: 150,
//         pos: (150,130),
//     "w": () => [
//         sprite("milk"),
//         area(),
//         solid(),
//         pos(100,30),
//         scale(4),
//         "milk",
//     ],
//     "o": () => [
//         sprite("water"),
//         area(),
//         solid(),
//         pos(100,20),
//         scale(2),
//         "water",
//     ],
//     "r": () => [
//         sprite("cooler"),
//         area(),
//         solid(),
//         pos(100,30),
//         scale(2),
//         "cooler",
//     ],
//     "d": () => [
//         sprite("sponsor"),
//         area(),
//         solid(),
//         pos(100,30),
//         scale(2),
//         "sponsor",
//     ],
//         "=": () => [
//             sprite("grass"),
//             area(),
//             solid(),
//         ],
//         "-": () => [
//             sprite("steel"),
//             area(),
//             solid(),
//         ],
//         "$": () => [
//             sprite("key"),
//             area(),
//             "key",
//         ],
//         "@": () => [
//             sprite("honeychuckles"),
//             area(),
//             solid(),
//             "player",
//         ],
//         "|": () => [
//             sprite("door"),
//             area(),
//             solid(),
//             "door",
//         ],
//         // any() is a special function that gets called everytime there's a
//         // symbole not defined above and is supposed to return what that symbol
//         // means
//         any(ch) {
//             const char = characters[ch]
//             if (char) {
//                 return [
//                     sprite(char.sprite),
//                     area(),
//                     solid(),
//                     "character",
//                     { msg: char.msg, },
//                 ]
//             }
//         },
//     })

//     // get the player game obj by tag
//     const player = get("player")[0]
//     const milk = get("milk")[0]
//     const water = get("water")[0]
//     const cooler = get("cooler")[0]
//     // const sponsor = get("sponsor")[0]


//     function addDialog() {
//         const h = 160
//         const pad = 16
//         const bg = add([
//             pos(0, height() - h),
//             rect(width(), h),
//             color(0, 0, 0),
//             z(100),
//         ])
//         const txt = add([
//             text("", {
//                 width: width(),
//             }),
//             pos(0 + pad, height() - h + pad),
//             z(100),
//         ])
//         bg.hidden = true
//         txt.hidden = true
//         return {
//             say(t) {
//                 txt.text = t
//                 bg.hidden = false
//                 txt.hidden = false
//             },
//             dismiss() {
//                 if (!this.active()) {
//                     return
//                 }
//                 txt.text = ""
//                 bg.hidden = true
//                 txt.hidden = true
//             },
//             active() {
//                 return !bg.hidden
//             },
//             destroy() {
//                 bg.destroy()
//                 txt.destroy()
//             },
//         }
//     }

//     let hasKey = false
//     const dialog = addDialog()

//     player.onCollide("key", (key) => {
//         destroy(key)
//         hasKey = true
//     })

//     player.onCollide("door", () => {
//         if (hasKey) {
//             if (levelIdx + 1 < levels.length) {
//                 go("main", levelIdx + 1)
//             } else {
//                 go("win")
//             }
//         } else {
//             dialog.say("you got no key!")
//         }
//     })

//     // talk on touch
//     player.onCollide("character", (ch) => {
//         dialog.say(ch.msg)
//     })

//     wait(30, () => {
// 		destroy(milk)
// 	})

//     wait(5, () => {
//         destroy(water)
//     } )

//     wait(3, () => {
//         destroy(cooler)
//     } )

//     wait(7, () => {
//         destroy(cooler)
//     } )



//     player.onCollide("milk", () => {
//         destroy(milk)
//         score.value += 3
//         score.text = "Score:" + score.value
//     })
//     player.onCollide("sponsor", () => {
//         destroy(sponsor)
//         score.value += 3
//         score.text = "Score:" + score.value
//     })

// // const explosions = add([
// //          sprite("explosion", { anim: "burst", }),
// //          lifespan(1, { fade: 0.5 }),
// //      ])
// //      explosions.go
//     // player.onUpdate(() => {
//     //  if (player.isColliding(bomb)) {
//     //      score += 1
//     //  }
//     // })


//     const dirs = {
//         "left": LEFT,
//         "right": RIGHT,
//         "up": UP,
//         "down": DOWN,
//     }

//     for (const dir in dirs) {
//         onKeyPress(dir, () => {
//             dialog.dismiss()
//         })
//         onKeyDown(dir, () => {
//             player.move(dirs[dir].scale(SPEED))
//         })
//     }

// })

// scene("win", () => {
//     add([
//         text("You Win!"),
//         pos(width() / 2, height() / 2),
//         origin("center"),
//     ])
// })

// go("main", 0)





// POS
// // loadSprite("submitSprite", "submitSprite.png")
// // const honeyChuckles = add([
// // sprite("honeychuckles"),
// //  pos(80, 400),
// //  area(),

// // ]);

// // const submitSprite = add ([
// //     sprite("submitSprite"),
// //     pos(30,300)
// // ])
// // var loop = loop(0.5, () => {
// //   var words =["ability", "able", "aboard", "bank", "bat", "basket", "begun", "bare", "barn", "bark", "ball", "base", "belt", "balance"]
// //  const bean = add([
// //     text(words[Math.floor(Math.random() * words.length)], {
// //       width: width(),
// //       styles: {
// //         "green": {
// //           color: rgb(128, 128, 255),
// //         },
// //         "wavy": (idx, ch) => ({
// //           color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
// //           pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
// //         }),
// //       },
// //     }),
// //        pos(rand(vec2(0), vec2(width(), height())))
// // ,
// //     origin("botleft"),
// //     // scale(0.5),
// //   ])
// //  // Execute something after 3 seconds.
// //  wait(3, () => {
// //    destroy(bean)
// //  }),
// //  onCharInput((ch) => {
// //     input.text += ch
// // })


// // })

