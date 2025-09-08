
import { useEffect, useState } from 'react';
import cls from './App.module.css'
import api from './api';
import type { AxiosError, AxiosResponse } from 'axios';

function App() {
  const [status, setstatus] = useState<boolean>(false);
  const [tradingPaars, setTradingPaars] = useState<string>('')
  const [needPass, setNeedPass] = useState<boolean>(false)
  const [inputText, setinputText] = useState<string>();
  const [feiledPass, setfeiledPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    setLoading(true)
    api.get('/trade/diCrossoverStatus').then((res: AxiosResponse) => {
      const { actives } = res.data
      if (actives.length > 0) {
        setstatus(true)
        setTradingPaars(actives)
      } else {
        setstatus(false)
      }
    }).finally(()=>{
        setLoading(false)
      })
  }, [status])

  const toogleStatusHandler = () => {
    setLoading(true)
    if (status) {
      api.post('/trade/diCrossoverStop', {}, {
        headers: {
          "x-trading-secret": inputText,
        }
      }
      ).then((res: AxiosResponse) => {
        setstatus(false)
        setNeedPass(false)
        setfeiledPass(false)
        setinputText('')
      }).catch((err: AxiosError) => {
        if (err.status === 401)
          setfeiledPass(true)
      }).finally(()=>{
        setLoading(false)
      })
    } else {
      api.post('/trade/diCrossoverStart', {}, {
        headers: {
          "x-trading-secret": inputText,
        }
      }
      ).then((res: AxiosResponse) => {
        setstatus(true)
        setNeedPass(false)
        setfeiledPass(false)
        setinputText('')
      }).catch((err: AxiosError) => {
        if (err.status === 401)
          setfeiledPass(true)
      }).finally(()=>{
        setLoading(false)
      })
    }

  }

  return (
    <div className={cls.container}>
      <div className={cls.logo}>
        <div className={cls.logoImage}><img src="/samurai.svg" alt="Logo" /></div>
        <div className={cls.logoText}>bushido</div>
      </div>

      {loading && <div className={cls.preloader}>Почекай поки я отримаю відповідь від сервера</div> }

      {needPass ?

        <>
          <div className={cls.pass}>
            <input type="text" value={inputText} onChange={(e) => { setinputText(e.target.value) }} placeholder='пароль' />
            <button onClick={toogleStatusHandler}>відправити</button>
          </div>
          {feiledPass &&
            <div style={{ color: 'red' }}>невірний пароль</div>
          }


        </>
        :
        <>
          <div className={cls.button}>
            {status ? <button onClick={() => { setNeedPass(true) }}>stop</button> : <button onClick={() => { setNeedPass(true) }}>start</button>}
            <div className={cls.buttonBack}></div>
          </div>
          <div className={cls.status}>
            {status ? <div className={cls.statusOk}>
              Бот зараз працює. Инструмент {tradingPaars}
            </div > : <div className={cls.statusNoOk}>
              Бот не працює
            </div>}
          </div>
        </>
      }
    </div>
  )
}

export default App
