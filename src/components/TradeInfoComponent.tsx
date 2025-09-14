import type { FunctionComponent } from "react";
import type { ITradeInfo } from "../types/tradeInfoInterfacesAndTypes";
import cls from './TradeInfoComponent.module.css'

interface TradeInfoComponentProps {
    infoArray: ITradeInfo[]
}

const TradeInfoComponent: FunctionComponent<TradeInfoComponentProps> = ({ infoArray }) => {

const reverseArray = [...infoArray].reverse()
    
    return (

        <div className={cls.items}>
            {
                reverseArray.map((el) => {
                    const { action, symbol, side, quantity, price, takeProfit, stopLoss } = el.command
                    const { pdi, mdi, adx, longAdx } = el.info.indicatorsValues
                    const { isDiContact, isFlat } = el.info
                    const now = new Date(el.now)
                    const uniqId = el.info.indicatorsValues.longAdx.toString() + el.info.indicatorsValues.adx + el.info.indicatorsValues.mdi

                    const bgClass = action === 'HOLD' ? cls.hold : cls.open
                    const colorClass = side === 'BUY' ? cls.green : cls.red
                    const isPositions = el.positions ? true : false
                    return (
                        <div key={uniqId} className={`${cls.item} ${bgClass}`} >
                            <div className={cls.itemActions}>
                                <div>{action}</div>
                                <div>{symbol}</div>
                                {side && <div className={colorClass}>{side}</div>}
                                {quantity && <div>Qty: {quantity}</div>}
                                {price && <div>Price: {price}</div>}
                                {takeProfit && <div className={cls.green}>TP: {takeProfit}</div>}
                                {stopLoss && <div className={cls.red}>SL: {stopLoss}</div>}
                            </div>
                            <div className={cls.itemInfo}>
                                <div>pdi: {pdi.toFixed(2)}</div>
                                <div>mdi: {mdi.toFixed(2)}</div>
                                <div>adx: {adx.toFixed(2)}</div>
                                <div>longAdx: {longAdx.toFixed(2)}</div>
                            </div>
                            <div>
                                <div className={isPositions ? cls.red : cls.green}>Відсутність позиції: {isPositions ? 'ні' : 'так'}</div>
                                <div className={isDiContact ? cls.green : cls.red}>Контакт DI: {isDiContact ? 'так' : 'ні'}</div>
                                <div className={isFlat ? cls.green : cls.red}>Флет: {isFlat ? 'так' : 'ні'}</div>
                                <div className={adx>20 ? cls.green : cls.red}>adx вище 20: {adx>20 ? 'так' : 'ні'}</div>

                                <div>Дата: {now.getDate()}-{now.getMonth() + 1}-{now.getFullYear()}</div>
                                <div>Час: {now.getHours()}:{now.getMinutes()}:{now.getSeconds()}</div>

                            </div>
                        </div>
                    )
                })
            }
        </div>

    );
}

export default TradeInfoComponent;