
kaboom();

// SPRITES
loadSprite("bag", "bag.png");
loadSprite("ghosty", "ghosty.png");
loadSprite("grass", "grass.png");
loadSprite("steel", "steel.png");
loadSprite("door", "door.png");
loadSprite("key", "key.png");
loadSprite("honeychuckles", "honeychuckles.png");
loadSprite("bg", "bg.png");
loadSprite("milk", "milk.png");
loadSprite("water", "water.png");
loadSprite("cooler", "cooler.png");
loadSprite("sponsor", "sponsor.png");
loadSprite("bg", "bg.png");
loadSprite("winbg", "winbg.png")
loadSprite("eyes", "eyes.png")
loadSprite("have", "have.png")
loadSound("wordPoints", "pointSound.mp3");
loadSound("keySound", "keySound.mp3");
loadSound("wrongWord", "wrongWord.mp3");

scene("start", () => {
  const bg = add([sprite("bg", { width: width(), height: height() })]);
  add([
    text("Press enter to start", { size: 100 }),
    pos(vec2(2000, 600)),
    origin("center"),
    color(0, 0, 255),
   
  ]);

  

  onKeyRelease("enter", () => {
    go("main", 0);
  })
});

go("start")

scene("main", (levelIdx) => {
  function grow(rate) {
    return {
      update() {
        const n = rate * dt();
        this.scale.x += n;
        this.scale.y += n;
      },
    };
  }

  grow();
  function late(t) {
    let timer = 0;
    return {
      add() {
        this.hidden = true;
      },
      update() {
        timer += dt();
        if (timer >= t) {
          this.hidden = false;
        }
      },
    };
  }
  late();
  const SPEED = 320;

wait(60, () => {
  go("youWon");
});

scene("youWon", () => {
  add([text("You Made It!"), pos(12), { width: width(), height: height() }]);
  const winbg = add([sprite("winbg", { width: width(), height: height() })]);
});



  const background = add([sprite("bg", { width: width(), height: height() })]);
  const keyCount = add([text("Key?:0"), pos(24, 490), { value: 0 }]);
  const score = add([text("Score:0"), pos(24, 1000), { value: 0 }]);
  const fakes = add([text("Fakes:0"), pos(24, 810), { value: 0 }]);
  const timer = add([text(""), pos(24, 360), scale(0.7),{ value: 0 }]);
  const timerDialogue = add([text("Timer:"),pos(24, 260), { value: 0 }]);
  const goal = add([text("Goal:15"), pos(24, 660), { value: 0 }]);

  
  var timeleft = 10;
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      timer.text  = "Finished";
    } else {
      timer.text  =
        timeleft;
    }
    timeleft -= 1;
  }, 1000);
  score.value += 2;
  score.text = "Score:" + score.value;


  // character dialog data
  const characters = {
    a: {
      sprite: "bag",
      msg: "ohhi how are you?",
    },
    b: {
      sprite: "ghosty",
      msg: "get out!",
    },
    r: {
      sprite: "cooler",
      msg: "not real!",
    },
  };

  // level layouts
  const levels = [
    [
      " ====|===",
      " = $ w o=",
      " = a    =",
      " = d  r =",
      " =2   1 =",
      " =      =",
      " =  3 s =",
      " =  @   =",
      " ========",
    ],
    [
      "---------",
      "-   l   -",
      "- e   t -",
      "-  $    -",
      "t    e  -",
      "- r     -",
      "-     s -",
      "-   @   -",
      "---------",
    ],
  ];

  addLevel(levels[levelIdx], {
    width: 300,
    height: 180,
    pos: vec2(64, 64),
    w: () => [sprite("milk"), area(), solid(), pos(100, 700), scale(4), "milk"],
    o: () => [
      sprite("water"),
      area(),
      solid(),
      pos(100, 20),
      scale(2),
     
      "water",
    ],
    1: () => [
      sprite("eyes"),
      area(),
      solid(),
      pos(100,400),
      scale(3),
      "eyes",
    ], 2: () => [
      sprite("have"),
      area(),
      solid(),
      pos(50, 10),
      scale(4),
      "have",
    ], 3: () => [
      sprite("water"),
      area(),
      solid(),
      pos(199, 10),
      scale(3),
      "water4",
    ],
    r: () => [
      sprite("cooler"),
      area(),
      solid(),
      pos(100, 30),
      scale(2),
      
      "cooler",
    ],
    d: () => [
      sprite("sponsor"),
      area(),
      solid(),
      pos(100, 30),
      scale(2),
      "sponsor",
    ],
    "=": () => [sprite("grass"), area(), solid()],
    "-": () => [sprite("steel"), area(), solid()],
    "$": () => [sprite("key"), area(),pos(50,10), "key"],
    "@": () => [sprite("honeychuckles"), area(), solid(), "player", scale(3)],
    "|": () => [sprite("door"), area(), solid(), "door"],
    // any() is a special function that gets called everytime there's a
    // symbole not defined above and is supposed to return what that symbol
    // means
    any(ch) {
      const char = characters[ch];
      if (char) {
        return [
          sprite(char.sprite),
          area(),
          solid(),
          "character",
          { msg: char.msg },
        ];
      }
    },
  });

 

  // get the player game obj by tag
  const player = get("player")[0];
  const milk = get("milk")[0];
  const water = get("water")[0];
  const eyes = get("eyes")[0]
  const have = get("have")[0]
  const water4 = get("water4")[0]
  const cooler = get("cooler")[0];
  const sponsor = get("sponsor")[0];
  // const sponsor = get("sponsor")[0]
  function addDialog() {
    const h = 160;
    const pad = 16;
    const bg = add([
      pos(0, height() - h),
      rect(width(), h),
      color(0, 0, 0),
      z(100),
    ]);
    const txt = add([
      text("", {
        width: width(),
      }),
      pos(0 + pad, height() - h + pad),
      z(100),
    ]);
    bg.hidden = true;
    txt.hidden = true;
    return {
      say(t) {
        txt.text = t;
        bg.hidden = false;
        txt.hidden = false;
      },
      dismiss() {
        if (!this.active()) {
          return;
        }
        txt.text = "";
        bg.hidden = true;
        txt.hidden = true;
      },
      active() {
        return !bg.hidden;
      },
      destroy() {
        bg.destroy();
        txt.destroy();
      },
    };
  }

  let hasKey = false;
  const dialog = addDialog();

  function water1PosRight() {
    if ("water") {
      wait(10, () => {
        destroy(water);
      });
    }

    player.onCollide("water", () => {
      destroy(water);
      play("wordPoints");
      score.value += 3;
      score.text = "Score:" + score.value;
    });
  }
  water1PosRight();
  // const water2 = add([sprite("water"), pos(700, 400), scale(2), "water2"]);
  // const water3 = add([sprite("water"), pos(900, 200), scale(2), "water3"]);
  // const water4 = add([sprite("water"), pos(1500, 600), scale(2), "water4"]);

  function fakeWords() {
    if ("eyes") {
      wait(10, () => {
        destroy(eyes);
      });
    }
    player.onCollide("eyes", () => {
      destroy(eyes);
      play("wrongWord", volume(0.2));
      play("wordPoints",volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
      score.value += 3;
      score.text = "Score:" + score.value;
    });
    if ("have") {
      wait(10, () => {
        destroy(have);
      });
    }
    player.onCollide("have", () => {
      destroy(have);
      play("wrongWord", volume(0.2));
      play("wordPoints",volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
      score.value += 1;
      score.text = "Score:" + score.value;
    });
    if ("water4") {
      wait(10, () => {
        destroy(water4);
      });
    }
    player.onCollide("water4", () => {
      destroy(water4);
      play("wrongWord", volume(0.1));
      play("wordPoints",volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
      score.value += 2;
      score.text = "Score:" + score.value;
    });
  }
  fakeWords();


  function milkBottom() {
    if ("milk") {
      wait(10, () => {
        destroy(milk);
      });
    }
    player.onCollide("milk", () => {
      destroy(milk);
      play("wrongWord",volume(0.1));
      play("wordPoints",volume(0.9));
      score.value += 2;
      score.text = "Score:" + score.value;
    });
  }
  milkBottom();

  function fakeMilks() {
    // const milk2 = add([sprite("milk"), pos(2000, 1400), scale(2), "milk2"]);
    // const milk3 = add([sprite("milk"), pos(700, 200), scale(3), "milk3"]);
    // const milk4 = add([sprite("milk"), pos(1300, 700), scale(4), "milk4"]);

    // if("milk2"){
    //   wait(5, () => {
    //     destroy(milk2)
    //   })
    // }
    // if("milk3"){
    //   wait(5, () => {
    //     destroy(milk3)
    //   })
    // }
    // if("milk4"){
    //   wait(7, () => {
    //     destroy(milk4)
    //   })
    // }
  }
  fakeMilks();

  function collisions() {
    player.onCollide("sponsor", () => {
      destroy(sponsor);
      play("wordPoints");
      score.value += 3;
      score.text = "Score:" + score.value;
    });
    player.onCollide("key", (key) => {
      destroy(key);
      play("keySound");
      hasKey = true;
      keyCount.value += 1;
      keyCount.text = "Key?:" + 1;
    });

    player.onCollide("door", () => {
      if (hasKey) {
        if (levelIdx + 1 < levels.length) {
          go("youWon", levelIdx + 1);
        } else {
          go("win");
        }
      } else {
        dialog.say("you got no key!");
      }
    });

    // talk on touch
    player.onCollide("character", (ch) => {
      dialog.say(ch.msg);
    });
  }
  collisions();

  const dirs = {
    left: LEFT,
    right: RIGHT,
    up: UP,
    down: DOWN,
  };

  for (const dir in dirs) {
    onKeyPress(dir, () => {
      dialog.dismiss();
    });
    onKeyDown(dir, () => {
      player.move(dirs[dir].scale(SPEED));
    });
  }
});



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
