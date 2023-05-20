export const arrayToRdf = (json: any[]) => {
  let turtle = '';
  turtle += '@prefix ex: <https://github.com/property/>.';
  for (let i = 0; i < json.length; i++) {
    const subject = `<https://github.com/resource/${i + 1}>`;

    turtle += `${subject} `;
    turtle += `ex:title "${json[i].title
      .replace(/(\r\n|\n|\r)/gm, '')
      .trim()}" ;\n`;
    turtle += `    ex:technology "${json[i].technology}" ;\n`;
    turtle += `    ex:lastUpdated "${json[i].lastUpdated}" .\n\n`;
  }

  return turtle;
};
