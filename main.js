const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let brushColor = 0

const allowedNameChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C",
  "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".",
  "-", "_", ",", "/", "\\", " ", "!", "?", "(", ")"
]
/*const nav = {
  home: {
    play: {
      levels: {},
      demo: {},
      myLevels: {},
      userLevels: {}
    },
    edit: {
      block: {
        saved: {},
        particles: {},
        settings: {}
      },
      color: {
        saved: {},
        sliders: {}
      },
      world: {
        settings: {},
        background: {},
        sound: {}
      }
    }
  }
}*/
let menus = {
  devSettings: {
    grid: {
      padding: 0.15,
      color: 6
    },
    title: {
      text: "Dev Settings",
      size: 7,
      color: 5,
      offset: 10
    },
    buttons: [ //
      {
        values: ["on", "off"],
        effects: {
          "on": {
            title: {
              text: "Dev Log On",
              size: 13,
              color: 5
            },
            func: function() {
              devLog = true
            },
            color: 4
          },
          "off": {
            title: {
              text: "Dev Log Off",
              size: 13,
              color: 5
            },
            func: function() {
              devLog = false
            },
            color: 3
          }
        },
        state: {
          default: "on"
        }
      }, // dev log
      {
        values: ["on", "off"],
        condition: function() {
          return true
        },
        effects: {
          "on": {
            title: {
              text: "Fake Slots On",
              size: 13,
              color: 5
            },
            func: function() {
              showButtonSpots = true
            },
            color: 4
          },
          "off": {
            title: {
              text: "Fake Slots Off",
              size: 13,
              color: 5
            },
            func: function() {
              showButtonSpots = false
            },
            color: 3
          }
        },
        state: {
          default: "off"
        }
      }, // fake slots
      {
        values: ["Red", "Green", "Blue"],
        effects: {
          "Red": {
            title: {
              text: "Red",
              size: 18,
              color: 5
            },
            func: function() {},
            color: 3
          },
          "Green": {
            title: {
              text: "Green",
              size: 18,
              color: 5
            },
            func: function() {},
            color: 4
          },
          "Blue": {
            title: {
              text: "Blue",
              size: 18,
              color: 5
            },
            func: function() {},
            size: 10,
            color: 2
          }
        },
        state: {
          default: "Red"
        }
      } // colorTest
    ]
  },
  settings: {
    grid: {
      padding: 0.15,
      color: 6
    },
    title: {
      text: "Settings",
      size: 7,
      color: 5,
      offset: 10
    },
    buttons: [ //
      {
        values: ["on", "off"],
        effects: {
          "on": {
            title: {
              text: "Warp Mode On",
              size: 11,
              color: 5
            },
            func: function() {
              warp = true
              resize()
            },
            color: 4
          },
          "off": {
            title: {
              text: "Warp Mode Off",
              size: 11,
              color: 5
            },
            func: function() {
              warp = false
              resize()
            },
            color: 3
          }
        },
        state: {
          default: "off"
        }
      }, // warp
      {
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: "Dev Settings",
              size: 13,
              color: 5
            },
            func: function() {
              nav.push("devSettings")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      } // dev settings
    ]
  },
  colorPicker: {
    setup: {
			func: function() {
				const i = menus.colorPicker
				i.buttons.splice(1)
				for (var n=0;n<colors.length;n++) {
          i.buttons.push({
            values: ["click"],
            effects: {
              "click": {
                func: function(i) {
                  brushColor = i.effect.color
                  i.menu.grid.color=brushColor
                  while (i.menu.title.color===brushColor) {
                    i.menu.title.color=Math.floor(Math.random()*colors.length)
                  }
                },
                color: n
              }
            },
            state: {
              default: "click"
            }
          })
				}
			}
		},
    grid: {
      padding: 0.15,
      color: 6
    },
    title: {
      text: "Color Picker",
      size: 7,
      color: 5,
      offset: 10
    },
    buttons: [ //
      {
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: "Color Editor",
              size: 13,
              color: 5
            },
            func: function() {
              nav.push("colorEditor")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      }, // canvas
    ]
  },
  colorEditor: {
    setup: {
			func: function() {
				const i = menus.colorEditor
				i.buttons.splice(1)
        i.buttons.push({
          values: [],
          effects: {
            "0": {
              color: 5,
              func: function(){},
              title: {
                text: "Press Me to Initialize",
                size: 7,
                color: 6
              }
            }
          },
          state: {
            default: "0"
          }
        })
        for (var j=0;j<256;j++) {
          let k = i.buttons[i.buttons.length-1]
          k.values.push("\""+j+"\"")
          k.effects["\""+j+"\""] = {
            title: {
              text: "Red: "+j,
              size: 15,
              color: 5
            },
            color: {r:j,g:0,b:0},
            func: function(i){
              i.menu.grid.color.r=i.button.values.indexOf(i.value)
              brushColor.r=i.button.values.indexOf(i.value)
            }
          }
        }
        i.buttons.push({
          values: [],
          effects: {
            "0": {
              color: 5,
              func: function(){},
              title: {
                text: "Press Me to Initialize",
                size: 7,
                color: 6
              }
            }
          },
          state: {
            default: "0"
          }
        })
        for (var j=0;j<256;j++) {
          let k = i.buttons[i.buttons.length-1]
          k.values.push("\""+j+"\"")
          k.effects["\""+j+"\""] = {
            title: {
              text: "Green: "+j,
              size: 15,
              color: 5
            },
            color: {r:0,g:j,b:0},
            func: function(i){
              i.menu.grid.color.g=i.button.values.indexOf(i.value)
              brushColor.g=i.button.values.indexOf(i.value)
            }
          }
        }
        i.buttons.push({
          values: [],
          effects: {
            "0": {
              color: 5,
              func: function(){},
              title: {
                text: "Press Me to Initialize",
                size: 7,
                color: 6
              }
            }
          },
          state: {
            default: "0"
          }
        })
        for (var j=0;j<256;j++) {
          let k = i.buttons[i.buttons.length-1]
          k.values.push("\""+j+"\"")
          k.effects["\""+j+"\""] = {
            title: {
              text: "Blue: "+j,
              size: 15,
              color: 5
            },
            color: {r:0,g:0,b:j},
            func: function(i){
              i.menu.grid.color.b=i.button.values.indexOf(i.value)
              brushColor.b=i.button.values.indexOf(i.value)
            }
          }
        }
        i.buttons.push({
          values: [],
          effects: {
            "0": {
              color: 5,
              func: function(){},
              title: {
                text: "Press Me to Initialize",
                size: 7,
                color: 6
              }
            }
          },
          state: {
            default: "0"
          }
        })
        for (var j=0;j<101;j++) {
          let k = i.buttons[i.buttons.length-1]
          k.values.push("\""+j+"\"")
          k.effects["\""+j+"\""] = {
            title: {
              text: "Alpha: "+j,
              size: 15,
              color: 5
            },
            color: {r:0,g:0,b:0,a:j/100},
            func: function(i){
              i.menu.grid.color.a=i.button.values.indexOf(i.value)/100
              brushColor.a=i.button.values.indexOf(i.value)/100
            }
          }
        }
        let c
        if (brushColor.r!== undefined) {
          c = brushColor
        } else {
          c = colors[brushColor]
        }
        let a = 1
        if (c.a!==undefined) {
          a=c.a
        }
        i.buttons[1].state.curent="\""+c.r+"\""
        i.buttons[2].state.curent="\""+c.g+"\""
        i.buttons[3].state.curent="\""+c.b+"\""
        i.buttons[4].state.curent="\""+a*100+"\""
        brushColor={r:c.r,g:c.g,b:c.b,a:a}
        i.grid.color={r:c.r,g:c.g,b:c.b,a:a}
      }
		},
    grid: {
      padding: 0.15,
      color: {r:0,g:0,b:0}
    },
    title: {
      text: "Color Editor",
      size: 7,
      color: 5,
      offset: 10
    },
    buttons: [ //
    {
      values: ["click"],
      effects: {
        "click": {
          title: {
            text: "Create Color",
            size: 13,
            color: 5
          },
          func: function() {
            colors.push(brushColor)            
          },
          color: 2
        }
      },
      state: {
        default: "click"
      }
    }
    ]
  },
  editor: {
    grid: {
      padding: 0.15,
      color: 6
    },
    title: {
      text: "Editor",
      size: 7,
      color: 5,
      offset: 10
    },
    buttons: [ //
      {
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: "Canvas",
              size: 13,
              color: 5
            },
            func: function() {
              nav.push("levelCanvas")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      }, // canvas
      {
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: "Color Picker",
              size: 13,
              color: 5
            },
            func: function() {
              nav.push("colorPicker")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      }, // color picker
      {
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: "Block Editor",
              size: 13,
              color: 5
            },
            func: function() {
              nav.push("blockEditor")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      }, // block editor
    ]
  },
	pauseMenu: {
    grid: {
      padding: 0.15,
      color: 6
    },
    title: {
      text: "Pause Menu",
      size: 7,
      color: 5,
      offset: 10
    },
    buttons: [ //
      {
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: "Settings",
              size: 13,
              color: 5
            },
            func: function() {
              nav.push("settings")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      }, // settings
			{
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: "Levels",
              size: 15,
              color: 5
            },
            func: function() {
              nav.push("levelSelection")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      }, // levels
			{
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: "Editor",
              size: 15,
              color: 5
            },
            func: function() {
              nav.push("editor")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      }, // editor
    ]
  },
	levelSelection :{
		setup: {
			func: function() {
				const i = menus.levelSelection
				i.buttons=[]
				for (var n=0;n<levels.length;n++) {
					const l = levels[n]
					let tt = "Level "+(n+1)
					let ts = 10
					if (l.title!=undefined) {
						tt = l.title.text
						ts = l.title.size
					}
					i.buttons.push({
        values: ["click"],
        effects: {
          "click": {
            title: {
              text: tt,
              size: ts,
              color: 5
            },
            func: function() {
              nav.push("settings")
            },
            color: 2
          }
        },
        state: {
          default: "click"
        }
      })
				}
			}
		},
		grid: {
			padding: 0.15,
			color: 6
		},
		title: {
			text: "Level Selection",
			size: 10,
			offset: 20,
			color: 5
		}
	}
}
let levels = [
	{
		title: {
			text: "Test",
			size: 10
		}
	},
	{}
]
let triggers = [
  /* 
	{
    input: {
      keys: {
        whitelist: [
        ],
        blacklist: []
      },
      buttons: {
        whitelist: [],
        blacklist: []
      },
      other: function() {
				return()
			}
    },
    mode: {
      when: "onPress",
      old: false
    },
    output: function() {
    }
  },
	*/
  {
    input: {
      keys: {
        whitelist: [
          "Escape"
        ]
      },
      other: function() {
        return nav.length==0
      }
    },
    mode: {
      when: "onRelease",
    },
    output: function() {
      nav = ["pauseMenu"]
    }
  },
	{
    input: {
      keys: {
        whitelist: [
          "Escape"
        ]
      },
      other: function() {
        return nav.length>0
      }
    },
    mode: {
      when: "onRelease",
    },
    output: function() {
      const i = nav.pop()
			if (menus[i].setup!=undefined) {
				menus[i].setup.state=true
			}
    }
  },
  {
    input: {
      buttons: {
        whitelist: [
          1
        ]
      },
      other: function() {
        return nav.length>0
      }
    },
    mode: {
      when: "onRelease",
    },
    output: function() {
      const i = nav.pop()
			if (menus[i].setup!=undefined) {
				menus[i].setup.state=true
			}
    }
  },
  {
    input: {
      keys: {
        whitelist: ["Shift"]
      },
      buttons: {
        whitelist: [0]
      }
    },
    mode: {
      when: "onPress"
    },
    output: function() {
      string = JSON.parse(localStorage.getItem("main"))
      ctx.fillStyle = rgb(3)
      ctx.fillRect(0, 0, canvasX, canvasY)
    }
  },
  {
    input: {
      keys: {
        whitelist: ["Shift"]
      },
      buttons: {
        whitelist: [2]
      }
    },
    mode: {
      when: "onPress"
    },
    output: function() {
      localStorage.setItem("main", JSON.stringify(string))
      ctx.fillStyle = rgb(4)
      ctx.fillRect(0, 0, canvasX, canvasY)
    }
  }
]
const fcx = 100
const fcy = 100
let clickTracker = [false, false, false]
let showButtonSpots = false
let warp = false
let devLog = true
let world = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
let string = []
let deltaTime = 0
let canvasX = 0
let canvasY = 0
let lastTime = 0
let colorMode = 1
let colorKey = [
  [`rgb(225,225,225,0.1)`, `rgb(0,0,0)`, `rgb(0,0,255)`, `rgb(255,0,0)`, `rgb(0,255,0)`, `rgb(0,0,0)`, `rgb(255,255,255)`],
  [`rgb(0,0,0,0.1)`, `rgb(225,225,225)`, `rgb(0,0,155)`, `rgb(155,0,0)`, `rgb(0,155,0)`, `rgb(255,255,255)`, `rgb(0,0,0)`]
]
let colors = [{r:0,g:0,b:0},{r:255,g:255,b:255},{r:0,g:0,b:155},{r:155,g:0,b:0},{r:0,g:155,b:0},{r:255,g:255,b:255},{r:0,g:0,b:0},{r:0,b:255,g:255},{r:255,g:255,b:0},{r:255,g:0,b:255},{r:176,g:50,b:79}]
let gridX = world[0].length
let gridY = world.length
let pressedKeys = []
let pressedButtons = []
let nav = []
let wheelScroll = 0
let oldWheelScroll = 0
let oldNav = []
let mouse = {
  x: 0,
  y: 0,
  gridX: 0,
  gridY: 0
}
let log = ""
let oldLog = ""
onmousemove = function(e) {
  mouse.x = minmax(e.clientX, 0, canvasX)
  mouse.y = minmax(e.clientY, 0, canvasY)
  mouse.gridX = minmax(Math.floor(e.clientX / (canvasX / gridX)), 0, gridX - 1)
  mouse.gridY = minmax(Math.floor(e.clientY / (canvasY / gridY)), 0, gridY - 1)
}
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (allowedNameChars.includes(keyName) && !(pressedKeys.includes("Control") && pressedKeys.includes("Alt"))) {
    string.push(keyName)
  } else if (string.length > 0 && keyName === "Backspace" && !pressedKeys.includes("Control")) {
    string.pop()
  } else if (string.length > 0 && keyName === "Backspace" && pressedKeys.includes("Control")) {
    string = []
  }
  if (!pressedKeys.includes(keyName)) {
    pressedKeys.push(keyName)
  }
})
document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  pressedKeys.splice(pressedKeys.indexOf(keyName), 1)
})
document.addEventListener("wheel", (event) => {
  wheelScroll += event.deltaY / 150
});
document.addEventListener('mousedown', e => {
  const button = event.button;
  if (!pressedButtons.includes(button)) {
    clickTracker[button] = true
    pressedButtons.push(button)
  }
});
document.addEventListener('mouseup', e => {
  const button = event.button;
  if (pressedButtons.includes(button)) {
    clickTracker[button] = false
  }
  pressedButtons.splice(pressedButtons.indexOf(button), 1)
});
document.addEventListener("contextmenu", e => e.preventDefault());
function resize() {
  canvas.width = canvasX = window.innerWidth
  canvas.height = canvasY = window.innerHeight
  if (!warp) {
    canvasX = Math.min(canvasX, canvasY)
    canvasY = canvasX
  }
}
window.onresize = resize
resize()
function rgb(i) {
  if (i.r!==undefined) {
    let a = 1
    if (i.a!==undefined) {
      a = i.a
    }
    return ("rgb("+i.r+","+i.g+","+i.b+","+a+")")
  } else {
    i = colors[i]
    let a = 1
    if (i.a!==undefined) {
      a = i.a
    }
    return ("rgb("+i.r+","+i.g+","+i.b+","+a+")")
  }
}
function checkInput(i) {
  let state = true
  if (i.input.keys != undefined) {
    if (i.input.keys.whitelist != undefined) {
      i.input.keys.whitelist.forEach((n) => {
        if (!pressedKeys.includes(n)) {
          state = false
        }
      })
    }
    if (i.input.keys.blacklist != undefined) {
      i.input.keys.blacklist.forEach((n) => {
        if (pressedKeys.includes(n)) {
          state = false
        }
      })
    }
  }
  if (i.input.buttons != undefined) {
    if (i.input.buttons.whitelist != undefined) {
      i.input.buttons.whitelist.forEach((n) => {
        if (!pressedButtons.includes(n)) {
          state = false
        }
      })
    }
    if (i.input.buttons.blacklist != undefined) {
      i.input.buttons.blacklist.forEach((n) => {
        if (pressedButtons.includes(n)) {
          state = false
        }
      })
    }
  }
  if (i.input.other != undefined) {
    if (!i.input.other()) {
      state = false
    }
  }
  if ((i.mode.when === "onPress" || i.mode.when === "onRelease") && i.mode.old === undefined) {
    i.mode.old = false
  }
  if (i.mode.when === "onPress" && state && !i.mode.old) {
    i.output()
  }
  if (i.mode.when === "onRelease" && !state && i.mode.old) {
    i.output()
  }
  if (i.mode.when === "hold" && state) {
    i.output()
  }
  i.mode.old = state
}
function menu(i) {
  if (menus[i] != undefined) {
    const n = menus[i]
    if (n.setup!=undefined&&n.setup.state!==false) {
      n.setup.state = false
      n.setup.func()
    }
    const cx = canvasX
    const cy = canvasY
    const p = n.grid.padding
    const mx = mouse.x
    const my = mouse.y
    let sx = 0
    let sy = 0
    let ex = 100
    let ey = 100
    let to = 0
    let ts, tw
    let gx = 1
    let gy = 1
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    if (n.grid.x!=undefined) {
      gx = n.grid.x
      gy = n.grid.y
    } else {
      let i = 0
      while ((gx*gy)<n.buttons.length) {
        if (i%2===0) {
          gx++
        } else {
          gy++
        }
        i++
      }
    }
    if (n.size != undefined) {
      sx = n.size.startX
      sy = n.size.startY
      ex = n.size.endX
      ey = n.size.endY
    }
    if (n.title != undefined) {
      tw = n.title.text
      ts = n.title.size
      to = n.title.offset
    }
    ctx.fillStyle = rgb(n.grid.color)
    ctx.fillRect(sx * (cx / fcx), sy * (cy / fcy), (ex - sx) * (cx / fcx), (ey - sy) * (cy / fcy))
    const unlockedButtons=n.buttons.filter(button => button.condition==undefined || button.condition()!==false)
    for (var y = 0; y < gy; y++) {
      for (var x = 0; x < gx; x++) {
        if (unlockedButtons[y * gx + x] != undefined || showButtonSpots) {
          const b = unlockedButtons[(y * gx + x) % unlockedButtons.length]
          let x1 = sx * (cx / fcx) + (x * 2 + 1) * ((ex - sx) / gx * p / 2) * (cx / fcx) + x * ((ex - sx) / gx - (ex - sx) / gx * p) * (cx / fcx)
          let x2 = ((ex - sx) / gx - (ex - sx) / gx * p) * (cx / fcx)
          let y1 = to * (cy / fcy) + sy * (cy / fcy) + (y * 2 + 1) * ((ey - sy - to) / gy * p / 2) * (cy / fcy) + y * ((ey - sy - to) / gy - (ey - sy - to) / gy * p) * (cy / fcy)
          let y2 = ((ey - sy - to) / gy - (ey - sy - to) / gy * p) * (cy / fcy)
          if (b.state.curent == undefined) {
            b.state.curent = b.state.default
          }
          if (mx >= x1 && mx <= x1 + x2 && my >= y1 && my <= y1 + y2) {
            const i = y * gx + x
            if (clickTracker[0] === true || clickTracker[2] === true || oldWheelScroll !== wheelScroll) {
              if (clickTracker[0] === true || oldWheelScroll < wheelScroll) {
                b.state.curent = b.values[(b.values.indexOf(b.state.curent) + b.values.length - 1) % b.values.length]
                clickTracker[0] = false
              }
              if (clickTracker[2] === true || oldWheelScroll > wheelScroll) {
                b.state.curent = b.values[(b.values.indexOf(b.state.curent) + b.values.length + 1) % b.values.length]
                clickTracker[2] = false
              }
              const d = {
                gridX: x,
                gridY: y,
                menu: n,
                button: b,
                value: b.state.curent,
                effect: b.effects[b.state.curent]
              }
              b.effects[b.state.curent].func(d)
            }
            x1 = sx * (cx / fcx) + x * ((ex - sx) / gx) * (cx / fcx)
            x2 = ((ex - sx) / gx) * (cx / fcx)
            y1 = to * (cy / fcy) + sy * (cy / fcy) + y * ((ey - sy - to) / gy) * (cy / fcy)
            y2 = ((ey - sy - to) / gy) * (cy / fcy)
          }
          ctx.fillStyle = rgb(b.effects[b.state.curent].color)
          ctx.fillRect(x1, y1, x2, y2)
          const e = b.state.curent
          if (b.effects[e].title != undefined) {
            const t = b.effects[e].title
            ctx.font = t.size * Math.min(1 / gx, 1 / gy) * Math.min(cx / fcx, cy / fcy) + "px Arial"
            ctx.fillStyle = rgb(t.color)
            ctx.fillText(t.text, x1 + x2 / 2, y1 + y2 / 2)
          }
        }
      }
    }
    if (n.title != undefined) {
      ctx.fillStyle = rgb(n.title.color)
      ctx.font = ts * Math.min(cx / fcx, cy / fcy) + "px Arial";
      ctx.fillText(tw, (ex - (ex - sx) / 2) * (cx / fcx), (sy + to / 2) * (cy / fcy))
    }
    oldWheelScroll = wheelScroll
  }
}
function buttonPressed(i) {
  clickTracker[i] = true
}
function minmax(i, min, max) {
  return (Math.max(Math.min(i, max), min))
}
function clearSlate() {
  ctx.fillStyle = rgb(0)
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}
function renderWorld() {
  for (var y = 0; y < gridY; y++) {
    for (var x = 0; x < gridX; x++) {
      ctx.fillStyle = rgb(world[y][x])
      ctx.fillRect(x * (canvasX / gridX), y * (canvasY / gridY), canvasX / gridX + 1, canvasY / gridY + 1)
    }
  }
}
function update(time) {
  deltaTime = time - lastTime
  lastTime = time

  clearSlate()
  renderWorld()
  menu(nav[nav.length-1])

  triggers.forEach((input) => {
    checkInput(input)
  })
  const state = oldNav.length!==nav.length
  console.log("nav:"+nav.length+" oldNav:"+oldNav.length+" different:"+state)
  if(state) {
    //console.log("update")
    //oldNav=nav
  }

  log = "x:" + mouse.x + " y:" + mouse.y + " grid x:" + mouse.gridX + " grid y:" + mouse.gridY + " wheel:" + wheelScroll + " keys:" + pressedKeys + " mouse buttons:" + pressedButtons + " buttons clicked:" + clickTracker + " string:" + string.join('') + " BrushColor:" + JSON.stringify(brushColor)
  if (log != oldLog && devLog) {
    console.log(log)
  }
  oldLog = log

  requestAnimationFrame(update)
}
requestAnimationFrame(update)