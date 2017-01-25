(function (global, libName = 'tw') {
  if (global.window === global) {
    // Handle browser
    if (global[libName] !== undefined) {
      return console.log(`"${libName}" is already taken in the global name space.`)
    }
    global[libName] = lib();
  } else {
    // Handle commonJS
    console.log('Common');
    module.exports = lib();
  }  
})(this);

function lib() {
  return {
    startTypist
  };
}

function startTypist (targetId, content, speed = 100) {
  if (!targetId || !content) { return console.log('Parameters "targetId" and "content" must be provided to "startTypist" method.');}
  if( !Array.isArray(content) ) { return console.log('Paramenter "content" must be of type Array.'); }

  const target = document.getElementById(targetId);
  if (!target) { return console.log(`Element with target id "${targetId}" not found.`); }

  const textId = targetId + '_Text';
  const cursorId = targetId + '_Cursor';

  const frag = document.createDocumentFragment();

  // Create element for text
  const textElem = document.createElement('span');
  textElem.setAttribute('id', textId);

  // Create element for cursor
  const cursorElem = document.createElement('span');
  cursorElem.setAttribute('id', targetId + '_Cursor');

  frag.appendChild(textElem);
  frag.appendChild(cursorElem);
  target.appendChild(frag);

  cursorToggle(cursorId);
  typeWords(textId, content, speed);
}

function cursorToggle (cursorId, toggleOn = true) {
  const cursorRoot = document.getElementById(cursorId);
  if (toggleOn) {
    const elem = document.createElement('span');
    elem.textContent = '|';
    cursorRoot.appendChild(elem);
  } else {
    cursorRoot.lastChild.remove();
  }
  setTimeout(cursorToggle.bind(this, cursorId, !toggleOn), 1000);
}

function typeWords(textId, words, speed, ind = 0) {
  if (words.length === ind) {
    ind = 0;
  }
  typeWord(textId, words[ind], speed, typeWords.bind(this, textId, words, speed, ++ind));
}

function typeWord(textId, word, speed, callback, letterInd = 0) {
  if (letterInd === word.length * 2) {
    return callback();
  }
  function afterDelay () {
    if (letterInd < word.length) {
      typeLetter(textId, word[letterInd]);
    } else {
      removeLetter(textId);
    }
    typeWord(textId, word, speed, callback, ++letterInd);
  }
  const delay = letterInd === word.length ? 3000 : speed;
   setTimeout(afterDelay, delay); 
}

function typeLetter(textId, letter) {
  const root = document.getElementById(textId);
  
  const elem = document.createElement('span');
  elem.textContent = letter;

  root.appendChild(elem);
}

function removeLetter(textId) {
   const root = document.getElementById(textId);
   root.lastChild.remove();
}