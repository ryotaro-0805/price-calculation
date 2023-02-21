import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

export default function Home() {

  const articles = [
    { name: 'first', price: 300 },
    { name: 'second', price: 400 },
    { name: 'third', price: 600 },
    { name: 'forth', price: 800 }]
  const ref = useRef<any>();
  const button = useRef<any>();
  const sizeRef = useRef<any>();

  const [selectName, setSelectName] = useState<any>(['']);
  const [missChech, setMissCheck] = useState<any>(0);
  const [sumPrice, setSumPrice] = useState<any>('');

  const [getData, setGetData] = useState<any>([]);

  const submit = () => {
    setSelectName(['']);
    setMissCheck(0);

    for (let i = 0; i < articles.length; i++) {
      if (ref.current[i * 2].checked) {
        setSelectName((indata: any) => [...indata, articles[i].name]);
        if (!(ref.current[i * 2 + 1].value.length === 0)) {
        } else {
          setMissCheck((e: any) => e + 1);
        }
      }
    }
  }

  const switchDisable = (e:any) => {
    if (!e.target.checked) getSizer();
    for (let i = 0; i < ref.current.length; i += 2) {
      ref.current[i].checked && (ref.current[i + 1].disabled = false)
      !ref.current[i].checked && (ref.current[i + 1].disabled = true)
      !ref.current[i].checked && (ref.current[i + 1].value = '')
    }
    checkCHeckBox();
  }

  const [checker, setChecker] = useState(0);
  const checkCHeckBox = () => {
    setChecker(0);
    ref.current[0].checked && setChecker((inData) => inData + 1);
    ref.current[2].checked && setChecker((inData) => inData + 1);
    ref.current[4].checked && setChecker((inData) => inData + 1);
  }

  useEffect(() => {
    checker > 0 ? (button.current.disabled = false) : (button.current.disabled = true);
  }, [checker]);

  const getSizer:any = () => {
    setGetData([]);
    for (let i = 0; i < articles.length; i++) {
      if ((ref.current[i * 2].checked)&&((ref.current[i * 2 + 1].value))) {
        setGetData((data:any) => [...data,
        { name: articles[i].name,
          price: articles[i].price,
          content: ref.current[i * 2 + 1].value
        }
        ]);
      }
    }
  }

  useEffect(() => {
    setSumPrice('');
    getData.map((data:any)=>{
      setSumPrice((inData:any)=>Number(inData)+Number(data.price)*Number(data.content)*0.01);
    });
  }, [getData]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>
          <form action="" ref={ref}>
            {articles.map((article, index:any) => (
              <div key={index}>
                <label htmlFor={index}>
                <input onChange={(e:any)=>{switchDisable(e);}} type="checkbox" name='' id={index} />
                <span>{article.name}-</span>
                <span>{article.price}円 </span>
                </label>
                <select onChange={() => getSizer()} ref={sizeRef} name={article.name} disabled>
                  <option value="">選択してください</option>
                  <option value="100">100g</option>
                  <option value="200">200g</option>
                  <option value="300">300g</option>
                </select>
              </div>
            ))}
          </form>
        </div>
        <p>銘柄</p>
          {getData.map((data:any,index:number) => (
        <div key={index}>
        <p>{data.name}-{data.price}円　{data.content}グラム</p>
        </div>
      ))}
        <p>合計:{sumPrice}円</p>
        <button ref={button} onClick={submit}>決定</button>
        {(missChech < 1) && (selectName.length > 0) ? <p>最終画面へ</p> : <p>選択を確認してください。</p>}
      </div>
    </>
  )
}
