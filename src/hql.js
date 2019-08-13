import global from './global';
const ace = require('brace');

// @ts-ignore
ace.define('ace/mode/hql', ['require', 'exports', 'ace/mode/text', 'ace/mode/hql_highlight_rules', 'ace/mode/hql_completions'], (acerequire, exports) => {
    const TextMode = acerequire('ace/mode/text').Mode;
    const HqlHighlightRules = acerequire('ace/mode/hql_highlight_rules').HqlHighlightRules;
    const HqlCompletions = acerequire('ace/mode/hql_completions').HqlCompletions;

    class Mode extends TextMode {
        constructor() {
            super();
            this.HighlightRules = HqlHighlightRules;
            this.$behaviour = this.$defaultBehaviour;
            this.$completer = new HqlCompletions();
        }

        static $id = 'ace/mode/hql';

        getCompletions(state, session, pos, prefix) {
            return this.$completer.getCompletions(state, session, pos, prefix);
        }
    }

    exports.Mode = Mode;
});

// @ts-ignore
ace.define('ace/mode/hql_highlight_rules', ['require', 'exports', 'ace/mode/text_highlight_rules'], (acerequire, exports) => {
    const TextHighlightRules = acerequire('ace/mode/text_highlight_rules').TextHighlightRules;

    class HqlHighlightRules extends TextHighlightRules {
        constructor() {
            super();

            const keywordMapper = (val) => {
                const fieldHash = {};
                for (let field of global.metaInfo.fields)
                    fieldHash[field.name.toLowerCase()] = field.type;

                const lowerVal = val.toLowerCase();
                if (lowerVal === 'and' || lowerVal === 'or' || lowerVal === 'not')
                    return 'keyword';
                if (fieldHash[lowerVal]) {
                    if (fieldHash[lowerVal] === 'string')
                        return 'field.string.hql';
                    else
                        return 'field.number.hql';
                }
                return 'illegalField.hql';
            };

            this.$rules = {
                start: [
                    {
                        token: keywordMapper,
                        regex: '[a-zA-Z$_][a-zA-Z0-9$_]*',
                    },
                    {
                        token: 'keyword.operator',
                        regex: '>|<|=|>=|<=',
                        next: 'constant',
                    },
                    {
                        token: 'paren.lparen',
                        regex: '[\(]',
                    },
                    {
                        token: 'paren.rparen',
                        regex: '[\)]',
                    },
                ],
                constant: [
                    {
                        token: 'string',
                        regex: '".*?"',
                        next: 'start',
                    },
                    {
                        token: 'constant.numeric',
                        regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b',
                        next: 'start',
                    },
                ]
            }
        }
    }

    exports.HqlHighlightRules = HqlHighlightRules;
});

//@ts-ignore
ace.define('ace/mode/hql_completions', ['require', 'exports'], (acerequire, exports) => {
    class HqlCompletions {
        getCompletions(state, session, pos, prefix, callback) {
            const token = session.getTokenAt(pos.row, pos.column);
            if (!token)
                return [];
            if (token.type.lastIndexOf('hql') > -1) {
                return global.metaInfo.fields.map(field => ({
                    caption: field.name,
                    snippet: field.name,
                    meta: field.description,
                    score: 1000000,
                }));
            }
        }
    }

    exports.HqlCompletions = HqlCompletions;
});
