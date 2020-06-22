/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Quill from 'quill'


export default function PureEditor() {
    var editor = null

    useEffect(() => {
        
        editor = new Quill('#editor-container', {
            modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
        
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
        
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean']
            ]
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'  // or 'bubble'
        });
        editor.format('direction', 'rtl');
        editor.format('align', 'right');    
     
        editor.on('editor-change', function(eventName, ...args) {
            if (eventName === 'text-change') {
              
              console.log(editor.root.innerHTML)
            } else if (eventName === 'selection-change') {
              // args[0] will be old range
            }
          });
    })

    
    return (
        <div id="editor-container">
        </div>
    )
}
