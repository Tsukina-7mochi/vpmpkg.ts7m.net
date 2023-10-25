import './labeledTextInput';

const getElementByIdOrNull = function<T extends HTMLElement = HTMLElement>(elementId: string): T {
  const element = document.getElementById(elementId) as T | null;
  if(element === null) {
    throw Error(`Element #${elementId} not found.`);
  }
  return element;
}

window.addEventListener('load', () => {
  const ghRepoInput = getElementByIdOrNull<HTMLInputElement>('gh_repo');
  const pkgIdInput = getElementByIdOrNull<HTMLInputElement>('pkg_id');
  const manifestPathInput = getElementByIdOrNull<HTMLInputElement>('manifest_path');
  const resultDiv = getElementByIdOrNull('result');

  ghRepoInput.addEventListener('change', () => {
    const value = ghRepoInput.value;
    const placeholder = 'io.github.' + ((): string => {
      const split = value.split('/').map((v) => v.toLowerCase().replace(/\W/, ''));
      if(split[0].length === 0) {
        split.shift();
      }
      if(split.length > 1) {
        return `${split[0]}.${split[1]}`;
      } else if(split.length > 0) {
        return `${split[0]}.repo`;
      }
      return 'owner.repo';
    })();

    pkgIdInput.setAttribute('placeholder', placeholder);
  });

  const updateResult = function() {
    const ghRepo = ghRepoInput.value;
    const pkgId = pkgIdInput.value;
    let manifestPath = manifestPathInput.value;
    if(!manifestPath.startsWith('/')) {
      manifestPath = '/' + manifestPath;
    }

    if(pkgId.length === 0) {
      resultDiv.textContent = `vpmpkg.ts7m.net/${ghRepo}${manifestPath}`;
    } else {
      resultDiv.textContent = `vpmpkg.ts7m.net/${ghRepo}${manifestPath}?pkgId=${pkgId}`;
    }
  }

  ghRepoInput.addEventListener('input', updateResult);
  pkgIdInput.addEventListener('input', updateResult);
  manifestPathInput.addEventListener('input', updateResult);
});
