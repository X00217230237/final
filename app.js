const { createApp } = Vue;

createApp({
  data() {
    return {
      navOp: false,
      srch: "",
      carIx: 0,
      carTmr: null,
      accIx: 0,
      sigOk: false,
      plnOk: false,
      plnDone: "",

      spots: [
        {
          id: 1,
          nam: "Creeping thyme",
          grp: "flowering plant",
          lit: "full sun",
          ftr: "low flowers",
          use: "small bees",
          txt: "Creeping thyme sits neatly around pot edges and brings lots of small flowers through the warmer months."
        },
        {
          id: 2,
          nam: "Heuchera corner",
          grp: "foliage plant",
          lit: "part shade",
          ftr: "dense cover",
          use: "cool shelter",
          txt: "Heuchera makes a cool leafy layer near the base of taller pots and helps break up open, exposed space."
        },
        {
          id: 3,
          nam: "Shallow water dish",
          grp: "habitat feature",
          lit: "mixed light",
          ftr: "safe water",
          use: "insects and birds",
          txt: "A shallow dish with a few stones gives insects somewhere to land and drink without the depth of a normal bowl."
        },
        {
          id: 4,
          nam: "Hollow stem bundle",
          grp: "habitat feature",
          lit: "dry shelter",
          ftr: "small cavities",
          use: "solitary bees",
          txt: "A small bundle of dry hollow stems can sit under cover and add tiny nesting spaces without using much room."
        },
        {
          id: 5,
          nam: "Nasturtium trail",
          grp: "flowering plant",
          lit: "sun to mixed",
          ftr: "long stems",
          use: "hoverflies",
          txt: "Nasturtiums trail over railings and add flowers at a lower level than upright pots."
        },
        {
          id: 6,
          nam: "Leaf-litter pot",
          grp: "habitat feature",
          lit: "part shade",
          ftr: "ground layer",
          use: "small invertebrates",
          txt: "Leaving a light layer of dry leaves in one deeper pot creates a simple ground layer for small invertebrates."
        }
      ],

      carSl: [
        {
          id: "layer",
          ttl: "Layered planting",
          img: "assets/img_1.png",
          alt: "Illustration of a balcony with low, medium and tall planted containers",
          txt: "Mix low, middle and taller plants so the balcony has more than one level of cover and flowers.",
          pts: [
            "Low plants around pot edges",
            "Flowers through the middle layer",
            "One taller sheltered corner"
          ]
        },
        {
          id: "water",
          ttl: "Water with landing points",
          img: "assets/img_2.png",
          alt: "Illustration of a shallow water dish with stones beside balcony plants",
          txt: "Even a tiny water dish works better when insects have stones or other firm places to land.",
          pts: [
            "Keep the water shallow",
            "Add a few clean stones",
            "Refresh the water often"
          ]
        },
        {
          id: "cover",
          ttl: "A quiet dry corner",
          img: "assets/img_3.png",
          alt: "Illustration of a protected balcony corner with stems and dense foliage",
          txt: "A quiet, dry corner adds another kind of habitat, especially when it sits close to leafy cover.",
          pts: [
            "Keep it away from heavy rain",
            "Leave it mostly undisturbed",
            "Place dry stems near foliage"
          ]
        }
      ],

      faqs: [
        {
          q: "What can I do with a very small balcony?",
          a: "Even one planter, a shallow water dish and a sheltered corner can create several different conditions for plants and small wildlife."
        },
        {
          q: "What if my balcony is mostly shaded?",
          a: "Shade can still support leafy plants, cooler shelter and protected corners. The best approach is to work with the light your balcony already receives."
        },
        {
          q: "Does balcony wildlife need a water source?",
          a: "A shallow dish with a few stones can offer a simple drinking point while giving insects safe places to land."
        },
        {
          q: "Do I need to buy special habitat products?",
          a: "Not necessarily. Dense planting, dry stems, fallen leaves and a little shallow water can already add useful variety."
        },
        {
          q: "How can I attract more pollinators?",
          a: "Try flowers with different shapes and flowering periods, especially in sunny areas, so nectar and pollen are available for longer."
        },
        {
          q: "Should every pot be kept perfectly tidy?",
          a: "Not always. A small amount of dry stems or leaf litter can provide useful cover for tiny invertebrates."
        }
      ],

      sigFrm: {
        nam: "",
        eml: "",
        vis: "",
        dt: "",
        nt: ""
      },

      sigErr: {},
      sigTch: {},

      plnFrm: {
        nam: "",
        eml: "",
        sz: "",
        lit: "",
        foc: ""
      },

      plnErr: {},
      plnTch: {}
    };
  },

  computed: {
    fltCards() {
      const q = this.srch.toLowerCase().trim();
      if (!q) {
        return this.spots;
      }
      return this.spots.filter((itm) => {
        const bag = `
          ${itm.nam}
          ${itm.grp}
          ${itm.lit}
          ${itm.ftr}
          ${itm.use}
          ${itm.txt}
        `.toLowerCase();
        return bag.includes(q);
      });
    },

    plnPrev() {
      const litMap = {
        shade: "shaded",
        mixed: "mixed-light",
        sun: "sunny"
      };

      const focMap = {
        pollinator: "pollinator corner",
        shelter: "shelter corner",
        season: "season-long planting"
      };
      if (!this.plnFrm.lit || !this.plnFrm.foc) {
        return "Choose light and goal";
      }
      return `${litMap[this.plnFrm.lit]} ${focMap[this.plnFrm.foc]}`;
    }
  },

  methods: {
    clsNav() {
      this.navOp = false;
    },
    strtCar() {
      this.pausCar();
      this.carTmr = setInterval(() => {
        this.carIx = (this.carIx + 1) % this.carSl.length;
      }, 3600);
    },
    pausCar() {
      if (this.carTmr) {
        clearInterval(this.carTmr);
        this.carTmr = null;
      }
    },
    nxtCar() {
      this.carIx = (this.carIx + 1) % this.carSl.length;
    },

    prvCar() {
      this.carIx =
          (this.carIx - 1 + this.carSl.length) % this.carSl.length;
    },

    goCar(ix) {
      this.carIx = ix;
    },

    togAcc(ix) {
      this.accIx = this.accIx === ix ? -1 : ix;
    },

    chkEml(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
    },

    valSig(fld) {
      this.sigTch[fld] = true;
      const v = this.sigFrm[fld];
      let msg = "";
      if (fld === "nam") {
        if (!v) {
          msg = "Display name is required.";
        } else if (v.length < 2) {
          msg = "Use at least 2 characters.";
        }
      }
      if (fld === "eml") {
        if (!v) {
          msg = "Email is required.";
        } else if (!this.chkEml(v)) {
          msg = "Enter a valid email address.";
        }
      }
      if (fld === "vis") {
        if (!v) {
          msg = "Tell us what you noticed.";
        } else if (v.length < 3) {
          msg = "Use at least 3 characters.";
        }
      }
      if (fld === "dt") {
        if (!v) {
          msg = "Choose the observation date.";
        } else {
          const picked = new Date(`${v}T00:00:00`);
          const now = new Date();
          now.setHours(23, 59, 59, 999);
          if (picked > now) {
            msg = "The date cannot be in the future.";
          }
        }
      }

      if (fld === "nt") {
        if (!v) {
          msg = "Add a short observation note.";
        } else if (v.length < 12) {
          msg = "Write at least 12 characters.";
        }
      }
      this.sigErr[fld] = msg;
      this.sigOk = false;
      return msg === "";
    },

    subSig() {
      const flds = ["nam", "eml", "vis", "dt", "nt"];
      const good = flds
          .map((f) => this.valSig(f))
          .every(Boolean);
      if (!good) {
        this.sigOk = false;
        return;
      }
      this.sigOk = true;
      this.sigFrm = {
        nam: "",
        eml: "",
        vis: "",
        dt: "",
        nt: ""
      };
      this.sigErr = {};
      this.sigTch = {};
    },
    valPln(fld) {
      this.plnTch[fld] = true;
      const v = this.plnFrm[fld];
      let msg = "";
      if (fld === "nam") {
        if (!v) {
          msg = "Display name is required.";
        } else if (v.length < 2) {
          msg = "Use at least 2 characters.";
        }
      }
      if (fld === "eml") {
        if (!v) {
          msg = "Email is required.";
        } else if (!this.chkEml(v)) {
          msg = "Enter a valid email address.";
        }
      }
      if (fld === "sz" && !v) {
        msg = "Choose a balcony size.";
      }
      if (fld === "lit" && !v) {
        msg = "Choose a light condition.";
      }
      if (fld === "foc" && !v) {
        msg = "Choose what you would like to encourage.";
      }
      this.plnErr[fld] = msg;
      this.plnOk = false;
      return msg === "";
    },

    subPln() {
      const flds = ["nam", "eml", "sz", "lit", "foc"];
      const good = flds
          .map((f) => this.valPln(f))
          .every(Boolean);
      if (!good) {
        this.plnOk = false;
        return;
      }
      this.plnDone = this.plnPrev;
      this.plnOk = true;
    }
  },

  mounted() {
    this.strtCar();
  },
  beforeUnmount() {
    this.pausCar();
  }
}).mount("#app");
