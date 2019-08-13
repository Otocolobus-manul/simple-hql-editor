import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import global from './global';
import * as ace from 'brace';
import 'brace/ext/language_tools';
import './hql.js';

export default function App() {
    const editorRef = useRef<HTMLDivElement>();
    useEffect(() => {
        const editor = ace.edit(editorRef.current);
        editor.getSession().setMode('ace/mode/hql');
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });
    }, []);

    useEffect(() => {
        axios.get('/database/some_table/meta_info').then(response => global.metaInfo = response.data);
    }, []);

    return (
        <div style={{ height: '100%' }} ref={editorRef}></div>
    );
}
