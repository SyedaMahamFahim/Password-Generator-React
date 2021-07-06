
import React,{useState} from 'react'
import './App.css'
import { toast, ToastContainer } from 'react-toastify'

import {
    numbers,
    upperCaseLetters,
    lowerCaseLetters,
    specialCharacters,
  } from './Characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message'
function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [uppercaseLetters,setUppercaseLetters]=useState(false)
  const [lowercaseLetters,setlowercaseLetters]=useState(false)
  const [includeNumbers,setIncludeNumbers]=useState(false)
  const [includeSymbols,setIncludeSymbols]=useState(false)
 
  
   
  const handleGeneratePassword=(e)=>{
    if (
        !lowercaseLetters &&
        !uppercaseLetters &&
        !includeNumbers &&
        !includeSymbols
      ) {
        notify('You must Select atleast one option', true)
      }
    let characterList = ''
    if (lowercaseLetters) {
        characterList = characterList + lowerCaseLetters
      }
    
      if (uppercaseLetters) {
        characterList = characterList + upperCaseLetters
      }
    
      if (includeNumbers) {
        characterList = characterList + numbers
      }
    
      if (includeSymbols) {
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)

    }
    return password
  }
  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }
  }

  return (
    <>
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2 className='generator__header'>Password Generator</h2>
          <div className='generator__password'>
            <h3>{password}</h3>
            <button onClick={handleCopyPassword}  className='copy__btn'>
              <i className='far fa-clipboard'></i>
            </button>
          </div>

          <div className='form-group'>
            <label htmlFor='password-strength'>Password length</label>
            <input
              onClick={(e)=>setPasswordLength(e.target.value)}
              defaultValue={passwordLength}
              type='number'
              id='password-strength'
              name='password-strength'
              max='20'
              min='10'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
            <input
              onClick={(e)=>setUppercaseLetters(e.target.checked)}
              defaultValue={uppercaseLetters}
              type='checkbox'
              id='uppercase-letters'
              name='uppercase-letters'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
            <input
            onClick={(e)=>setlowercaseLetters(e.target.checked)}
              defaultValue={lowercaseLetters}
              type='checkbox'
              id='lowercase-letters'
              name='lowercase-letters'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-numbers'>Include Numbers</label>
            <input
            onClick={(e)=>setIncludeNumbers(e.target.checked)}
               defaultValue={includeNumbers}
              type='checkbox'
              id='include-numbers'
              name='include-numbers'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-symbols'>Include Symbols</label>
            <input
            onClick={(e)=>setIncludeSymbols(e.target.checked)}
               defaultValue={includeSymbols}
              type='checkbox'
              id='include-symbols'
              name='include-symbols'
            />
          </div>

          <button className='generator__btn' onClick={handleGeneratePassword}>
            Generate Password
          </button>
         
        </div>
      </div>
    </div>
    <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </>
  );
}

export default PasswordGenerator;
