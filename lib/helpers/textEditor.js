'use babel';

import isJSON from 'is-json';

import {
  NPM_LIBRARY_DESCRIPTION,
} from '../constants/elements';

import {
  readDependenciesFromJson,
} from './dependencies';

export const isValidEditor = (textEditor, validFiles = ['package.json']) => {
  const fileName = textEditor.getTitle();
  if (validFiles.indexOf(fileName) < 0) {
    return false;
  }

  return true;
};

export const readFile = ({ atom, store }) => (textEditor) => {
  if (!isValidEditor(textEditor)) {
    return;
  }

  const text = textEditor.getText();
  if (!isJSON.strict(text)) {
    const fileName = textEditor.getTitle();
    atom.notifications.addWarning(
      `${NPM_LIBRARY_DESCRIPTION}: There was a problem reading ${fileName}`,
    );
    return;
  }

  readDependenciesFromJson(JSON.parse(text), { textEditor, store });
};

export const updateFile = (textEditor) => {

};