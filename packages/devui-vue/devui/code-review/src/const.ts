export const ExpandLineReg = /^@@ -(\d+),(\d+) \+(\d+),(\d+) @@/;
export const FirstLineReg = /^@@ -[0,1](?!\d)/;
export const TableTrReg = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
export const TableTdReg = /<td[^>]*>[\s\S]*?<\/td>/gi;
export const TableTbodyReg = /<tbody[^>]*>[\s\S]*?<\/tbody>/gi;
export const TableTbodyAttrReg = /<tbody([^>]*)>/i;
export const EmptyDataLangReg = /<div[^>]* data-lang="">[\s\S]*?<\/div>/gi;
export const LineByLineTemplate = `<div id="{{fileHtmlId}}" class="d2h-file-wrapper" data-lang="{{file.language}}">
<div class="d2h-file-diff">
    <div class="d2h-code-wrapper">
        <table class="d2h-diff-table">
            <tbody class="d2h-diff-tbody">
            {{{diffs}}}
            </tbody>
        </table>
    </div>
</div>
</div>`;
export const SideBySideTemplate = `<div id="{{fileHtmlId}}" class="d2h-file-wrapper" data-lang="{{file.language}}">
<div class="d2h-files-diff">
    <div class="d2h-file-side-diff">
        <div class="d2h-code-wrapper">
            <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                {{{diffs.left}}}
                {{{diffs.right}}}
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>`;
export const EmptyTemplate = {
  'generic-empty-diff': '',
};
export const TemplateMap = {
  'line-by-line': { 'line-by-line-file-diff': LineByLineTemplate, ...EmptyTemplate },
  'side-by-side': { 'side-by-side-file-diff': SideBySideTemplate, ...EmptyTemplate },
};
