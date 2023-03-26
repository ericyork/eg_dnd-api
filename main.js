let title = document.getElementById('name');
let kind = document.getElementById('kind');
let ac = document.getElementById('ac');
let hp = document.getElementById('hp');
let spd = document.getElementById('spd');
let subtype = "", burrow = "", climb = "", fly = "", hover = "", swim = "";
let str = document.getElementById('str');
let dex = document.getElementById('dex');
let con = document.getElementById('con');
let int = document.getElementById('int');
let wis = document.getElementById('wis');
let cha = document.getElementById('cha');


// gets the data object
function getData() {
  let monster = document.querySelector("input").value;
  fetch('https://www.dnd5eapi.co/api/monsters/' + monster)
  .then(res => res.json())
  .then(data => {
    // heading info
    title.innerText = data.name;
    if (data.subtype == null) {
      subtype = "";
    } else {
      subtype = ' (' + data.subtype + '), ';
    }
    kind.innerText = data.size + ' ' + data.type + ", " + subtype + data.alignment;
    // prime stats
    ac.innerText = data.armor_class;
    hp.innerText = data.hit_points + ' (' + data.hit_dice + ')';
    spd.innerText = data.speed.walk;

    //determines movement types
    if (data.speed.burrow == null) {
      burrow = "";
    } else {
      burrow = ", burrow " + data.speed.burrow;
    };
    if (data.speed.climb == null) {
      climb = "";
    } else {
      climb = ", climb " + data.speed.climb;
    };
    if (data.speed.fly == null) {
      fly = "";
    } else {
      fly = ", fly " + data.speed.fly;
    };
    if (data.speed.hover == false) {
      hover = "";
    } else {
      hover = "(hover) ";
    };
    if (data.speed.swim == null) {
      swim = "";
    } else {
      swim = ", swim " + data.speed.swim;
    };
    spd.innerText = data.speed.walk + burrow + climb + fly + hover + swim;

    // ability scores and modifiers
    let calcMod = "";
    function calcMods() {
      const abilityArr = [
        {"attr": "strength", "value": data.strength},
        {"attr": "dexterity", "value": data.dexterity},
        {"attr": "constitution", "value": data.constitution},
        {"attr": "intelligence", "value": data.intelligence},
        {"attr": "wisdom", "value": data.wisdom},
        {"attr": "charisma", "value": data.charisma}
      ];
      for (const ability of abilityArr) {
        if (ability.value >=0 && ability.value <= 1) {
          calcMod = '-5';
        } else if (ability.value >= 2 && ability.value <= 3) {
          calcMod = '-4';
        } else if (ability.value >= 4 && ability.value <= 5) {
          calcMod = '-3';
        } else if (ability.value >= 6 && ability.value <= 7) {
          calcMod = '-2';
        } else if (ability.value >= 8 && ability.value <= 9) {
          calcMod = '-1';
        } else if (ability.value >= 10 && ability.value <= 11) {
          calcMod = '0';
        } else if (ability.value >= 12 && ability.value <= 13) {
          calcMod = '+1';
        } else if (ability.value >= 14 && ability.value <= 15) {
          calcMod = '+2';
        } else if (ability.value >= 16 && ability.value <= 17) {
          calcMod = '+3';
        } else if (ability.value >= 18 && ability.value <= 19) {
          calcMod = '+4';
        } else if (ability.value >= 20 && ability.value <= 21) {
          calcMod = '+5';
        } else if (ability.value >= 22 && ability.value <= 23) {
          calcMod = '+6';
        } else if (ability.value >= 24 && ability.value <= 25) {
          calcMod = '+7';
        } else if (ability.value >= 26 && ability.value <= 27) {
          calcMod = '+8';
        } else if (ability.value >= 28 && ability.value <= 29) {
          calcMod = '+9';
        } else {
          calcMod = '+10';
        }
        ability["mod"] = calcMod;
      }
    str.innerText = data.strength + ' (' + abilityArr[0].mod + ')';
    dex.innerText = data.dexterity + ' (' + abilityArr[1].mod + ')';
    con.innerText = data.constitution + ' (' + abilityArr[2].mod + ')';
    int.innerText = data.intelligence + ' (' + abilityArr[3].mod + ')';
    wis.innerText = data.wisdom + ' (' + abilityArr[4].mod + ')';
    cha.innerText = data.charisma + ' (' + abilityArr[5].mod + ')';
    }
    calcMods();

    // sets proficiencies
    let qualities = document.getElementById('qualities');
    let saves = document.getElementById('saves');
    let skills = document.getElementById('skills');
    let profLine = "";
    const profs = data.proficiencies;
    for (let x in profs) {
      if (data.proficiencies.length === 0) {
        profLine = "";
      } else if (data.proficiencies[x].proficiency.index.includes("saving-throw-")) {
        profLine = data.proficiencies[x].proficiency.name.slice(14, data.proficiencies[x].proficiency.name.length) + " +" + data.proficiencies[x].value;
        let save = document.createElement("span");
        saves.appendChild(save).innerText = profLine + ", ";
        saves.classList.remove("hidden");
      } else {
        profLine = data.proficiencies[x].proficiency.name.slice(7, data.proficiencies[x].proficiency.name.length) + " +" + data.proficiencies[x].value;
        let skill = document.createElement("span");
        skills.appendChild(skill).innerText = profLine + ", ";
        skills.classList.remove("hidden");
      }
    }

    // Sets damage vulnerabilities
    const dmgVulnerabilities = data.damage_vulnerabilities;
    let dmgVuln = "";
    let vEl = document.getElementById('vulnerabilities');
    for (let v in dmgVulnerabilities) {
      if (data.damage_vulnerabilities.length === 0) {
        dmgVuln = "";
      } else {
        dmgVuln = data.damage_vulnerabilities[v];
        let vSpan = document.createElement("span");
        vEl.appendChild(vSpan).innerText = dmgVuln + ", ";
        vEl.classList.remove("hidden");
      }
    }

    // Sets damage resistances
    const dmgResistance = data.damage_resistances;
    let dmgRest = "";
    let rEl = document.getElementById('resistances');
    for (let r in dmgResistance) {
      if (data.damage_resistances.length === 0) {
        dmgRest = "";
      } else {
        dmgRest = data.damage_resistances[r];
        let rSpan = document.createElement("span");
        rEl.appendChild(rSpan).innerText = dmgRest + ", ";
        rEl.classList.remove("hidden");
      }
    }

    // Sets damage immunities
    const dmgImmunities = data.damage_immunities;
    let iText = "";
    let eImm = document.getElementById('immunities');
    for (let dI in dmgImmunities) {
      if (data.damage_immunities.length === 0) {
        iText = "";
      } else {
        iText = data.damage_immunities[dI];
        let dmgIm = document.createElement("span");
        eImm.appendChild(dmgIm).innerText = iText + "; ";
        eImm.classList.remove("hidden");
      }
    }

    // Sets conditional immunities
    const condImmunities = data.condition_immunities;
    let cText = "";
    let cImm = document.getElementById('cond-immunities');
    for (let cI in condImmunities) {
      if (data.condition_immunities.length === 0) {
        cText = "";
      } else {
        cText = data.condition_immunities[cI].name;
        let condIm = document.createElement("span");
        cImm.appendChild(condIm).innerText = cText + "; ";
        cImm.classList.remove("hidden");
      }
    }

    // Sets senses
    const senses = data.senses;
    let pSense = document.getElementById('senses');
    let bs = document.getElementById('bs');
    let dv = document.getElementById('dv');
    let trem = document.getElementById('trem');
    let sight = document.getElementById('sight');
    let pp = document.getElementById('pp');
    if (data.senses.length != 0) {
      pSense.classList.remove("hidden");
    }
    if (data.senses.blindsight != null) {
      bs.classList.remove("hidden");
      bs.innerText = "Blindsight " + data.senses.blindvision;
    } else {
      bs.innerText = "";
    }
    if (data.senses.darkvision != null) {
      dv.classList.remove("hidden");
      dv.innerText = "Darkvision " + data.senses.darkvision;
    } else {
      dv.innerText = "";
    }
    if (data.senses.tremorsense != null) {
      trem.classList.remove("hidden");
      trem.innerText = "Tremorsense " + data.senses.tremorsense;
    } else {
      trem.innerText = "";
    }
    if (data.senses.truesight != null) {
      sight.classList.remove("hidden");
      sight.innerText = "Truesight " + data.senses.truesight;
    } else {
      sight.innerText = "";
    }
    if (data.senses.passive_perception != null) {
      pp.classList.remove("hidden");
      pp.innerText = "passive Perception " + data.senses.passive_perception;
    } else {
      pp.innerText = "";
    }

    // Sets languages
    let lText = "";
    let lEl = document.getElementById('languages');
    if (data.languages.length === 0) {
      lText = "";
    } else {
      lText = data.languages;
      lEl.classList.remove("hidden");
      let lSpan = document.createElement("span");
      lSpan.innerText = lText;
      lEl.appendChild(lSpan);
    }

    // sets challenges
    let chEl = document.getElementById('challenges');
    let chSpan = document.createElement("span");
    chSpan.innerText = data.challenge_rating + " (" + data.xp + ' XP)';
    chEl.appendChild(chSpan);
    chEl.classList.remove("hidden");

    // sets traits
    const traits = data.special_abilities;
    let sAct = document.getElementById('actions');
    let dTraits = document.getElementById('traits');
    let abName = "";
    let abDesc = "";
    for (let t in traits) {
      if (data.special_abilities.length === 0) {
        dTraits.classList.add("hidden");
      } else {
        abName = data.special_abilities[t].name;
        abDesc = data.special_abilities[t].desc;
        let pTrait = document.createElement('p');
        let pCont = dTraits.appendChild(pTrait);
        pCont.innerText = abName + ". ";
        let sTrait = document.createElement('span');
        let sCont = pTrait.appendChild(sTrait);
        sCont.innerText = abDesc;
      }
    }

    // sets actions
    const actions = data.actions;
    let dActions = document.getElementById('actions');
    let actName = "";
    let actDesc = "";
    let actCont = "";
    let actContName = "";
    let use = "";
    for (let act in actions) {
      if (data.actions.length === 0) {
        dActions.classList.add("hidden");
      } else {
        if (data.actions[act].usage == null) {
          use = "";
        } else {
          use = " (" + data.actions[act].usage.times + "/" + data.actions[act].usage.type + ")";
        }
        actName = data.actions[act].name + use;
        actDesc = data.actions[act].desc;
        let pAct = document.createElement('p');
        actContName = dActions.appendChild(pAct);
        actContName.innerText = actName + ". ";
        let sAct = document.createElement('span');
        actCont = pAct.appendChild(sAct);
        actCont.innerText = actDesc;
      }
    }

    // sets legendary actions
    const legActions = data.legendary_actions;
    let dLegActions = document.getElementById('legend');
    let legName = "";
    let legDesc = "";
    let legCont = "";
    let legContName = "";
    for (let leg in legActions) {
      if (data.legendary_actions != null) {
        dLegActions.classList.remove("hidden");
        legName = data.legendary_actions[leg].name;
        legDesc = data.legendary_actions[leg].desc;
        let pLeg = document.createElement('p');
        legContName = dLegActions.appendChild(pLeg);
        legContName.innerText = legName + ". ";
        let sLeg = document.createElement('span');
        legCont = pLeg.appendChild(sLeg);
        legCont.innerText = legDesc;
      }
    }
    //logs the object
    //console.log(data);
  });

}
function clearForm() {
  
}
