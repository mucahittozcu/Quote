"use client"
import { useState, useEffect} from "react"

const Api = "https://type.fit/api/quotes"
const App = () => {

    //alıntıyı saklamak için 
const [quotes,setQuotes] = useState([])

    //mevcut alıntıyı saklamak için
const [currentQuote, setCurrentQuote] = useState(null)


//useEffect ilk kez render edildiğinde bir etkileşim gerçekleşiyor.Bu etkileşim harici bir Api'den alıntıları getiriyor "setQuotes(data)" aracılığıyla bu alıntıları yerel bir duruma yerleştiriyor.
useEffect(() => { 
    const fetchQuotes = async () => {
      try {
        //fetch işlemi await ile bekletilir ve işlem tamamlanana kadar sonraki satıra geçilmez. Ardından, gelen cevap await ile bekletilerek dönüştürülür.
        const response = await fetch(Api)
        const data = await response.json();
        setQuotes(data)

        //Sayfa ilk açıldığında rastgele bir alıntı seç
        const randomIndex = Math.floor(Math.random() * data?.length);
        // rastgele seçilen bir alıntının currentQuote state'ine atanmasını sağlıyor. Yani, currentQuote değişkeni, seçilen rastgele alıntıyı temsil ediyor.
        setCurrentQuote(data?.[randomIndex]);
        //Sayfa ilk açıldığında rastgele bir alıntı seç
        
      } catch (error) {
        console.error('Alıntıları alma sırasında bir hata oluştu:', error)
      }
    }
    fetchQuotes()
  }, [])

//Mevcut alıntılar dizesinden rastgele bir alıntı alır. Math.random() fonksiyonu ile alıntı dizisinin uzunluğu arasında rastgele bir sayı üretilir ve bu sayı bir dizinin indeksi olarak kullanılarak rastgele bir alıntı seçilir. Seçilen alıntı, setCurrentQuote aracılığıyla currentQuote durumuna yerleştirilir.
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes?.length)
    setCurrentQuote(quotes?.[randomIndex])
  }


return (
    <>
    <h1 className="header">Random Quote Generator</h1>
    <div className="container">
    {currentQuote && (
      <div >
        <button className="btn" onClick={getRandomQuote}>New Quote</button>
        <h3 className="text">{currentQuote.text}</h3>
        <p className="auther">- {currentQuote.author}</p>
      </div>
    )}
  </div>
    </>
)
}
  

export default App



// useEffect(() =>{
//     //alıntıları fonksiyonu çağırarak alıyoruz
//     fetchQuotes()
//     .then(data => {
//     //state'ye veriyi aktarıyoruz
//         setQuotes(data)
//     })
//     .catch(error => {
//         console.log("API isteği sırasında bir hata oluştu:", error);
//     })
// },[])