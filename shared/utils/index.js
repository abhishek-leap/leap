export const parsePostBody = body => {
  const bodyObj = JSON.parse(body);
  const elements = bodyObj.blocks;

  const title = elements.find(obj => obj.type === 'header-one')?.text;
  const description = elements.find(obj => obj.type === 'unstyled')?.text;

  return [title, description];
};
