import * as RNLocalize from 'react-native-localize';
import {enabledLanguages, formattedMessages} from '../constants';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const languageFiles = {
  en: require('../../translations/en.json'),
  ru: require('../../translations/ru.json'),
  fr: require('../../translations/fr.json'),
  es: require('../../translations/es.json'),
  zh: require('../../translations/zh.json'),
  ar: require('../../translations/ar.json'),
  id: require('../../translations/id.json'),
  de: require('../../translations/de.json'),
  it: require('../../translations/it.json'),
  pt: require('../../translations/pt.json'),
  ja: require('../../translations/ja.json'),
  tr: require('../../translations/tr.json'),
  ca: require('../../translations/ca.json'),
  el: require('../../translations/el.json'),
  nl: require('../../translations/nl.json'),
  jv: require('../../translations/jv.json'),
  ko: require('../../translations/ko.json'),
  he: require('../../translations/he.json'),
  hr: require('../../translations/hr.json'),
  uk: require('../../translations/uk.json'),
};

export default function useLocalization() {
  const [langJson, setLangJson] = useState([]);
  const {lang} = useSelector(state => state.user);

  useEffect(() => {
    configI18();
  }, [lang]);

  const translate = key => {
    if (langJson[key]) {
      return langJson[key];
    } else if (formattedMessages[key]) {
      return formattedMessages[key];
    } else {
      return key;
    }
  };

  const setLanguageData = async lang => {
    const res = await languageFiles[lang];
    if (res) {
      setLangJson(res?.messages);
    }
  };

  const configI18 = async () => {
    const fallback = {languageTag: 'en'};
    const {languageTag} =
      RNLocalize.findBestLanguageTag(enabledLanguages) || fallback;
    await setLanguageData(lang || languageTag);
  };
  return {configI18, translate};
}
