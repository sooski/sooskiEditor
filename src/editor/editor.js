import React, { useEffect, useState } from 'react'
import ReactQuill, {Quill}  from 'react-quill';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'react-quill/dist/quill.snow.css';



export default function Editor() {

  

    var EMPTY_DELTA = {ops: []};
    const modules = {
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
      ],
    }
    
    console.log(Quill.imports)
    let Direction = Quill.import('formats/direction');
    Direction.blotName  = 'direction'
    Direction.tagName = 'rtl'

    Quill.register(Direction, true);
  
  
    const [theme, settheme] = useState('snow')
    const [enabled, setenabled] = useState(true)
    const [readOnly, setreadOnly] = useState(false)  
    const [value, setvalue] = useState(EMPTY_DELTA)
    const [event, setevent] = useState([])
    const [selection, setselection] = useState()
    const [code, setcode] = useState('')



   const onEditorChange = (value, delta, source, editor) => {
        setvalue(editor.getContents())
        setcode(editor.getHTML())
        setevent([`[${source}] text-change`, ...event])
        console.log(value)
        console.log(editor)
        console.log(editor.getHTML())
        console.log(editor.getText())
        
      }
    
    
      let onEditorChangeSelection = (range, source) => {
      //  console.log(range)
      //  console.log(selection)
      //  console.log(source)
      //  console.log('-------------')
  
            setselection(range)
             setevent([`[${source}] selection-change(${formatRange(selection)} -> ${formatRange(range)})`, ...event])
            
        
          
        
      }
    
      const onEditorFocus = (range, source) => {
        setevent([`[${source}] focus(${formatRange(range)})`].concat(event))
    
      }
    
      const onEditorBlur = (previousRange, source) => {
        setevent([`[${source}] blur(${formatRange(previousRange)})`].concat(event))
        
      }
    
      const onToggle = () => {
        setenabled(!enabled)
      }
    
      const onToggleReadOnly = () => {
        setreadOnly(!readOnly)
        
      }
    
      const onSetContents = () => {
        setvalue('This is some <b>fine</b> example content')
       
      }
    
    
    
      const formatRange = (range) => {
    
        if(range)
            return [range.index, range.index + range.length].join(',')
             
        return 'none'
    
      }

    return (
      <Container fluid>
        <Row lg={8}>
        {renderToolbar()}
        </Row>
        <Row>
          <Col lg={9} className="overflow-hidden" className="">
            <ReactQuill
              theme={theme}
              value={value}
              readOnly={readOnly}
              onChange={onEditorChange}
              onChangeSelection={onEditorChangeSelection}
              onFocus={onEditorFocus}
              onBlur={onEditorBlur}
              modules={modules}
              
              placeholder="همچی امادست تا شاهکارت رو خلق کنی"
            />
          </Col>
          <Col lg={3}>
            {renderSidebar()}
          </Col>
        </Row>
      </Container>
        
    )




   function  renderToolbar() {
       
        var enabled = enabled;
        var readOnly = readOnly;
        var selection = formatRange(selection);
        return (
          <div>
            <button onClick={onToggle}>
              {enabled? 'Disable' : 'Enable'}
            </button>
            <button onClick={onToggleReadOnly}>
              Set {readOnly? 'read/Write' : 'read-only'}
            </button>
            <button onClick={onSetContents}>
              Fill contents programmatically
            </button>
            <button disabled={true}>
              Selection: ({selection})
            </button>
          </div>
        );
      }
    
     function  renderSidebar() {
        
        return (
          <div style={{ overflow:'hidden', float:'right' }}>
            <textarea
              style={{ display:'block', width:300, height:300 }}
              value={code}
              readOnly={true}
            />
            
            
            {/* <textarea
              style={{ display:'block', width:300, height:300 }}
              value={event.join('\n')}
              readOnly={true}
            /> */}
          </div>
        );
      }
    
    }




