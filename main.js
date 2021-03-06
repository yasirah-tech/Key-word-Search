kaboom();

// SPRITES
loadSprite("bag", "bag.png");
loadSprite("ghosty", "ghosty.png");
loadSprite("fences", "fences.png");
loadSprite("front", "front.png");
loadSprite("grass", "grass.png");
loadSprite("steel", "steel.png");
loadSprite("door", "door.png");
loadSprite("key", "key.png");
loadSprite("house", "house.png");
loadSprite("honeychuckles", "honeychuckles.png");
loadSprite("follower", "follower.png");
loadSprite("follower2", "follower2.png");
loadSprite("follower3", "follower3.png");
loadSprite("follower4", "follower4.png");
loadSprite("follower5", "follower5.png");
loadSprite("side", "side.png");
loadSprite("bg", "bg.png");
loadSprite("milk", "milk.png");
loadSprite("water", "water.png");
loadSprite("cooler", "cooler.png");
loadSprite("sponsor", "sponsor.png");
loadSprite("bg", "bg.png");
loadSprite("winbg", "winbg.png");
loadSprite("winningBackground", "winningBackground.png");
loadSprite("eyes", "eyes.png");
loadSprite("have", "have.png");
loadSprite("rain", "rain.png");
loadSprite("wall", "wall.png");
loadSprite("side", "side.png");

// SOUNDS
loadSound("wordPoints", "pointSound.mp3");
loadSound("keySound", "keySound.mp3");
loadSound("wrongWord", "wrongWord.mp3");
loadSound("victory", "victory.mp3");
loadSound("magicalSound", "magicalSound.mp3");

scene("win", () => {
  wait(10, () => {
    play("magicalSound");
  });
  play("victory");
  const bg = add([
    sprite("winningBackground", { width: width(), height: height() }),
  ]);
  const honeyChuckles = add([
    sprite("honeychuckles"),
    scale(4),
    pos(80, 1800),
    "player",
  ]);
  const honey = get("player")[0];

  let house = add([sprite("house"), pos(2500, 665), scale(40), "house"]);
  add([
    text("   You Made It \n Now get home", { size: 200 }),
    pos(2100, 320),
    origin("center"),
    color(rgb(156, 211, 222)),
  ]);

  // honey.onCollide("house", () => {
  //   destroy(honey);
  //   play("victory", volume(0.2));
  // });

  //   honey.onCollide("house", () => {
  //     play("victory")
  //     destroy(honey)
  //   })

  const SPEED = 320;

  const dirs = {
    left: LEFT,
    right: RIGHT,
    up: UP,
    down: DOWN,
  };

  for (const dir in dirs) {
    onKeyDown(dir, () => {
      honey.move(dirs[dir].scale(SPEED));
    });
  }
});

scene("info", () => {
  const infobg = add([sprite("winbg", { width: width(), height: height() })]);
  add([
    text("Info", { size: 200 }),
    pos(vec2(2035, 600)),
    origin("center"),
    color(rgb(156, 211, 222)),
  ]);
  let curFont = 0;
  let curSize = 48;
  const pad = 100;
  let instructions = add([
    pos(pad),
    text(
      ` You MUST have a
    \n     key and 
    \n    EXACTLY 20
    \n  points to win!`,
      {
        //   width: width() - pad * 2,
        //   size: curSize,
        lineSpacing: 20,
        letterSpacing: 40,
        transform: (idx, ch) => ({
          color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.9),
          scale: 2,
          angle: wave(-9, 9, time() * 3 + idx),
        }),
      },
      { size: 120 }
    ),
    pos(vec2(1300, 900)),
  ]);
  let newGame = add([
    pos(pad),
    text(` Press 'g' to start a new game`),
    pos(1300, 2000),
  ]);

  add([
  pos(pad),
  text(`   Press 'r' for Home Screen`),
    pos(1300, 2180),
  ])

  onKeyPress("g", () => {
    go("main", 0);
  });

  onKeyPress("r", () => {
    go("start", 0);
  });
});

scene("start", () => {
  const bg = add([sprite("bg", { width: width(), height: height() })]);
  add([
    text("Key-word Search", { size: 200 }),
    pos(vec2(2035, 600)),
    origin("center"),
    color(rgb(156, 211, 222)),
  ]);

  function info() {
    onKeyPress("i", () => {
      go("info");
    });
  }
  info();

  let curFont = 0;
  let curSize = 48;
  const pad = 100;
  const sprites = ["key"];

  let instructions = add([
    pos(pad),
    text(
      `     Win by reaching
    \n       the goal and
    \n      collecting the
    \n          key and  
    \n     word pieces before 
    \n       they disappear`,
      {
        //   width: width() - pad * 2,
        //   size: curSize,
        lineSpacing: 20,
        letterSpacing: 40,
        transform: (idx, ch) => ({
          color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
          scale: 2,
          angle: wave(-9, 9, time() * 3 + idx),
        }),
      },
      { size: 120 }
    ),
    pos(vec2(920, 835)),
  ]);

  add([
    text("Press enter to begin", { size: 100 }),
    pos(vec2(2030, 2010)),
    origin("center"),
  ]);
  add([
    text("Press 'i' for Game Info", { size: 100 }),
    pos(vec2(2030, 2200)),
    origin("center"),
  ]);

  onKeyPress("enter", () => {
    go("main", 0);
  });
});

go("start");

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

  // Press R to Restart
  function restartCommand() {
    onKeyPress("r", () => {
      go("start");
    });
  }
  restartCommand();

  function info() {
    onKeyPress("i", () => {
      go("info");
    });
  }
  info();

  function winnningScreen() {
    onKeyPress("w", () => {
      go("win");
    });
  }
  winnningScreen();

  const SPEED = 320;
  const background = add([sprite("bg", { width: width(), height: height() })]);
  const keyCount = add([
    text("Key?:0"),
    pos(24, 490),
    color(253, 207, 9),
    { value: 0 },
  ]);
  const score = add([
    text("Score:0"),
    pos(24, 1000),
    color(0, 0, 255),
    scale(0.9),
    { value: 0 },
  ]);
  const restart = add([
    text("Press 'r'\nto  Restart"),
    pos(24, 1500),
    color(148, 195, 74),
    scale(0.9),
    "restart",
    { value: 0 },
  ]);
  const information = add([
    text(" \nPress 'i' \n  for   \nGame Info"),
    pos(24, 1695),
    color(18, 122, 92),
    scale(0.9),
    "information",
    { value: 0 },
  ]);
  const warning = add([
    text("**!!Pressing \n'i' will \nlose Game \nProgress!!**", { outline: 0 }),
    pos(24, 2020),
    color(243, 58, 0),
    scale(0.9),
    "warning",
    { value: 0 },
  ]);
  const fakes = add([
    text("Fakes:0"),
    pos(24, 823),
    color(237, 67, 125),
    { value: 0 },
  ]);
  const timer = add([text(""), pos(24, 360), color(151, 36, 0), scale(0.7)]);
  const timerDialogue = add([
    text("Timer:"),
    pos(24, 260),
    color(203, 224, 166),
    { value: 0 },
  ]);
  const goal = add([
    text("Goal:20"),
    pos(24, 660),
    color(51, 111, 48),
    { value: 0 },
  ]);

  // character dialog data

  const characters = {
    a: {
      sprite: "cooler",
      size: 40,
      msg: "Stalling!!",
    },
    b: {
      sprite: "ghosty",
      msg: "get out!",
    },
    c: {
      sprite: "cooler",
      msg: "not real!",
    },
  };
  if (characters.key) {
    if (a.sprite === "cooler") {
      scale(4);
    }
  }

  // level layouts
  const levels = [
    [
      " ////////",
      " / $ w o=",
      " / a ^  =",
      " / d r  =",
      " |2 % & =",
      " / ^#1% =",
      " / @3s  =",
      " ////////",
    ],
    [
      " --------",
      " - #    |",
      " -#  #r -",
      " -# # 3 -",
      " - # d#2-",
      " - #  #o-",
      " - @  #w-",
      " =======-",
      "---------",
    ],
    [
      " ///////=",
      " = $ w o=",
      " = a    =",
      " = d  r = ",
      " |2     =",
      " = 1    =",
      " =  3 s =",
      " =  @   =",
      " ////////",
    ],
  ];

  addLevel(levels[levelIdx], {
    width: 500,
    height: 300,
    pos: vec2(64, 64),
    w: () => [
      sprite("milk"),
      area(),
      solid(),
      pos(100, 700),
      scale(4),
      rotate(0),
      "milk",
    ],
    o: () => [
      sprite("water"),
      area(),
      solid(),
      pos(20, 250),
      scale(2),
      rotate(0),
      "water",
    ],
    1: () => [
      sprite("eyes"),
      area(0.3),
      solid(),
      pos(40, 10),
      scale(3),
      rotate(0),
      "eyes",
    ],
    2: () => [
      sprite("have"),
      area(),
      solid(),
      pos(500, 10),
      scale(4),
      rotate(0),
      "have",
    ],
    3: () => [
      sprite("rain"),
      area(),
      solid(),
      pos(500, 100),
      scale(4),
      rotate(0),
      "rain",
    ],
    r: () => [
      sprite("cooler"),
      area(),
      solid(),
      pos(100, 90),
      scale(2),
      rotate(0),
      "cooler",
    ],
    d: () => [
      sprite("sponsor"),
      area(),
      solid(),
      pos(100, 30),
      scale(2),
      rotate(0),
      "sponsor",
    ],
    "/": () => [sprite("grass"), area(), scale(1), solid()],
    "=": () => [sprite("grass"), area(), scale(1), solid()],
    "-": () => [sprite("steel"), area(), solid()],
    $: () => [sprite("key"), area(), pos(500, 200), rotate(0), scale(2), "key"],
    "@": () => [sprite("honeychuckles"), area(), solid(), "player", scale(3)],
    "#": () => [
      sprite("follower"),
      area(),
      solid(),
      "enemy",
      scale(5),
      pos(200, 10),
    ],
    "%": () => [
      sprite("follower2"),
      area(),
      solid(),
      "follower2",
      scale(5),
      pos(200, 10),
    ],
    "&": () => [
      sprite("follower3"),
      area(),
      solid(),
      "follower3",
      scale(5),
      pos(200, 10),
    ],
    "!": () => [
      sprite("follower4"),
      area(),
      solid(),
      "follower4",
      scale(5),
      pos(200, 10),
    ],
    "^": () => [
      sprite("follower5"),
      area(),
      solid(),
      "follower5",
      scale(5),
      pos(200, 10),
    ],
    "|": () => [
      sprite("door"),
      area(),
      scale(1),
      pos(0.0009, 10),
      solid(),
      "door",
    ],
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

  // onClick(() => go("game"))

  // get the player game obj by tag
  const player = get("player")[0];
  const follower = get("enemy")[0];
  const milk = get("milk")[0];
  const water = get("water")[0];
  const eyes = get("eyes")[0];
  const have = get("have")[0];
  const rain = get("rain")[0];
  const cooler = get("cooler")[0];
  const sponsor = get("sponsor")[0];
  const key = get("key")[0];
  const enemy = get("enemy")[0];
  const follower2 = get("follower2");
  const follower3 = get("follower3");
  const follower4 = get("follower4");
  const follower5 = get("follower5");

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
  var timeleft = 20;
  var downloadTimer = setInterval(function inerval() {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      timer.text = "Finished";
    } else {
      timer.text = timeleft + `${timeleft === 1 ? "\nsecond" : "\nseconds"}`;
    }
    timeleft -= 1;
  }, 1000);

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
      wait(5, () => {
        destroy(eyes);
      });
    }
    player.onCollide("eyes", () => {
      destroy(eyes);
      play("wrongWord", volume(0.2));
      play("wordPoints", volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
      score.value += 3;
      score.text = "Score:" + score.value;
    });
    if ("have") {
      wait(16, () => {
        destroy(have);
      });
    }
    player.onCollide("have", () => {
      destroy(have);
      play("wrongWord", volume(0.2));
      play("wordPoints", volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
      score.value += 2;
      score.text = "Score:" + score.value;
    });
    if ("rain") {
      wait(5, () => {
        destroy(rain);
      });
    }
    player.onCollide("rain", () => {
      destroy(rain);
      play("wrongWord", volume(0.1));
      play("wordPoints", volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
      score.value += 3;
      score.text = "Score:" + score.value;
    });

    if ("sponsor") {
      wait(16, () => {
        destroy(sponsor);
      });
    }
    player.onCollide("sponsor", () => {
      destroy(sponsor);
      play("wrongWord", volume(0.1));
      play("wordPoints", volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
      score.value += 3;
      score.text = "Score:" + score.value;
    });

    if ("cooler") {
      wait(10, () => {
        destroy(cooler);
      });
    }
    player.onCollide("cooler", () => {
      destroy(cooler);
      play("wrongWord", volume(0.1));
      play("wordPoints", volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
      score.value += 2;
      score.text = "Score:" + score.value;
    });
    if ("key") {
      wait(21, () => {
        destroy(key);
      });
    }
    player.onCollide("key", () => {
      hasKey = true;
      destroy(key);
      play("wrongWord", volume(0.1));
      play("wordPoints", volume(0.9));
      keyCount.value += 1;
      keyCount.text = "Key?:" + keyCount.value;
      score.value += 5;
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
      play("wrongWord", volume(0.1));
      play("wordPoints", volume(0.9));
      fakes.value += 1;
      fakes.text = "Fakes:" + fakes.value;
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
    player.onCollide("door", () => {
      if (hasKey && score.value >= 20) {
        const newbg = add([
          sprite("winbg", { width: width(), height: height() }),
        ]);

        if (levelIdx + 1 < levels.length) {
          go("win", levelIdx + 1);
        } else {
          go("win");
        }
      } else {
        return hasKey && score.value < 20
          ? dialog.say(
              `You have a key, but you only have ${
                score.value
              } points, you need ${20 - score.value} more points!`
            )
          : dialog.say("Can't unlock! Must have key and 20 points!");
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
//    destroy(milk)
//  })

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
