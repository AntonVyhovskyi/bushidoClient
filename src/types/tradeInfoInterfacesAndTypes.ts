
export interface ICommand {
    action: "OPEN" | "CLOSE" | "UPDATE" | 'HOLD';
    symbol: string;
    side?: "BUY" | "SELL";
    quantity?: number;
    orderType?: "MARKET" | "LIMIT";
    price?: number;
    stopLoss?: number;
    takeProfit?: number;
    reduceOnly?: boolean
}

export interface IPosition {
  symbol: string;                
  // Торговий інструмент (пара), наприклад "BTCUSDT".

  positionAmt: string;           
  // Кількість контрактів у позиції:
  //   "0" → позиція закрита,
  //   позитивне значення → відкритий лонг,
  //   негативне значення → відкритий шорт.

  entryPrice: string;            
  // Середня ціна входу в позицію (усереднена по всіх угодах).

  markPrice: string;             
  // Поточна "маркувальна" ціна (Mark Price), яку Binance використовує 
  // для розрахунку PnL та ліквідації (захищає від маніпуляцій на ринку).

  unRealizedProfit: string;      
  // Нереалізований прибуток/збиток (PnL) по позиції у USDT.

  leverage: string;              
  // Плече (наприклад "20" → x20).

  maxNotionalValue: string;      
  // Максимальна дозволена вартість позиції (notional) для даного плеча.

  marginType: "isolated" | "cross";  
  // Тип маржі:
  //   "isolated" → маржа виділена тільки під цю позицію,
  //   "cross" → маржа спільна для всього акаунту.

  isolatedMargin: string;        
  // Сума маржі, виділена під ізольовану позицію (якщо marginType = isolated).

  isAutoAddMargin: string;       
  // Чи ввімкнено автоматичне додавання маржі:
  //   "true" → Binance буде докидати маржу з балансу,
  //   "false" → ні.

  positionSide: "BOTH" | "LONG" | "SHORT"; 
  // Режим позиції:
  //   "BOTH" → односторонній режим (звичайна торгівля),
  //   "LONG" → хеджований лонг,
  //   "SHORT" → хеджований шорт.

  notional: string;              
  // Нотіонал (загальна вартість позиції в USDT).
  // Формула ≈ positionAmt * markPrice.

  isolatedWallet?: string;       
  // Гаманець ізольованої маржі (доступні кошти на цю позицію). 
  // Є тільки для marginType = isolated.

  updateTime?: number;           
  // Час останнього оновлення даних (Unix timestamp, мс).
}


export interface ITradeInfo {
    command: ICommand,
    positions?: IPosition[],
    info: {
        indicatorsValues: {
            pdi: number,
            mdi: number,
            adx: number,
            longAdx: number
        },
        isDiContact: boolean,
        isFlat: boolean
    },
    now: Date

}



// export const testTradeInfos: ITradeInfo[] = [
//   {
//     command: {
//       action: "OPEN",
//       symbol: "BTCUSDT",
//       side: "BUY",
//       quantity: 0.01,
//       orderType: "MARKET",
//       price: 30000,
//       takeProfit: 31000,
//       stopLoss: 29500,
//     },
//     positions: [ 
//       {
//         symbol: "BTCUSDT",
//         positionAmt: "0.01",
//         entryPrice: "30000",
//         markPrice: "30100",
//         unRealizedProfit: "10",
//         leverage: "20",
//         maxNotionalValue: "500000",
//         marginType: "isolated",
//         isolatedMargin: "50",
//         isAutoAddMargin: "false",
//         positionSide: "BOTH",
//         notional: "301",
//         isolatedWallet: "50",
//         updateTime: Date.now(),
//       }
//     ],
//     info: {
//       indicatorsValue: {
//         pdi: 25,
//         mdi: 20,
//         adx: 23,
//         longAdx: 30
//       },
//       isDiContact: true,
//       isFlat: false
//     },
//     now: new Date()
//   },
//   {
//     command: {
//       action: "HOLD",
//       symbol: "ETHUSDT",
//     },
//     positions: [
//       {
//         symbol: "ETHUSDT",
//         positionAmt: "0",
//         entryPrice: "2000",
//         markPrice: "1980",
//         unRealizedProfit: "-20",
//         leverage: "10",
//         maxNotionalValue: "200000",
//         marginType: "cross",
//         isolatedMargin: "0",
//         isAutoAddMargin: "true",
//         positionSide: "BOTH",
//         notional: "0",
//       }
//     ],
//     info: {
//       indicatorsValue: {
//         pdi: 15,
//         mdi: 18,
//         adx: 12,
//         longAdx: 20
//       },
//       isDiContact: false,
//       isFlat: true
//     },
//     now: new Date()
//   },
//   {
//     command: {
//       action: "CLOSE",
//       symbol: "BNBUSDT",
//       side: "SELL",
//       quantity: 1,
//       orderType: "LIMIT",
//       price: 400,
//     },
//     positions: [
//       {
//         symbol: "BNBUSDT",
//         positionAmt: "-1",
//         entryPrice: "410",
//         markPrice: "405",
//         unRealizedProfit: "5",
//         leverage: "5",
//         maxNotionalValue: "100000",
//         marginType: "isolated",
//         isolatedMargin: "50",
//         isAutoAddMargin: "false",
//         positionSide: "SHORT",
//         notional: "405",
//         isolatedWallet: "50",
//         updateTime: Date.now(),
//       }
//     ],
//     info: {
//       indicatorsValue: {
//         pdi: 30,
//         mdi: 10,
//         adx: 25,
//         longAdx: 35
//       },
//       isDiContact: true,
//       isFlat: false
//     },
//     now: new Date()
//   }
// ];