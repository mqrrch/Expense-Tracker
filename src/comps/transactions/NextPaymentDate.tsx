import { useEffect, useState } from "react";

interface Props{
    isLoading: boolean;
    selectedFrequency: string;
    transactionNextPaymentDate: string | number;
    setTransactionNextPaymentDate: React.Dispatch<React.SetStateAction<string>>;
}

export default function NextPaymentDate(
    { isLoading, selectedFrequency, transactionNextPaymentDate, setTransactionNextPaymentDate }: Props
){
    const [inputType, setInputType] = useState<string>('text');
    const nextPaymentDate = document.getElementById('transaction-next-payment-date') as HTMLInputElement;
    useEffect(() => { 
        switch(selectedFrequency){
            case 'Weekly':
                setInputType('number');
                setTransactionNextPaymentDate('');
                nextPaymentDate.placeholder = 'Enter day (1: Monday)';
                nextPaymentDate.classList.remove('cursor-pointer');
                nextPaymentDate.classList.add('cursor-text');
                nextPaymentDate.min = '1';
                nextPaymentDate.max = '7';
                nextPaymentDate.onblur = () => {
                    if (!nextPaymentDate.value || parseInt(nextPaymentDate.value) < 1) {
                        nextPaymentDate.value = '1'
                    } else if (parseInt(nextPaymentDate.value) > 7) {
                        nextPaymentDate.value = '7'
                    }
                }
                break;
            case 'Monthly':
                setInputType('number');
                setTransactionNextPaymentDate('');
                nextPaymentDate.placeholder = 'Enter day (1 - 31)';
                nextPaymentDate.classList.remove('cursor-pointer');
                nextPaymentDate.classList.add('cursor-text');
                nextPaymentDate.min = '1';
                nextPaymentDate.max = '31';
                nextPaymentDate.onblur = () => {
                    if (!nextPaymentDate.value || parseInt(nextPaymentDate.value) < 1) {
                        nextPaymentDate.value = '1';
                    } else if (parseInt(nextPaymentDate.value) > 31) {
                        nextPaymentDate.value = '31';
                    };
                };
                break;
            case 'Yearly':
                setInputType('number');
                setTransactionNextPaymentDate('');
                nextPaymentDate.placeholder = 'Enter day (1 - 31)';
                nextPaymentDate.classList.remove('cursor-pointer');
                nextPaymentDate.classList.add('cursor-text');
                nextPaymentDate.min = '1';
                nextPaymentDate.max = '31';
                nextPaymentDate.onblur = () => {
                    if (!nextPaymentDate.value || parseInt(nextPaymentDate.value) < 1) {
                        nextPaymentDate.value = '1';
                    } else if (parseInt(nextPaymentDate.value) > 31) {
                        nextPaymentDate.value = '31';
                    };
                };
                break;
        }

    }, [setTransactionNextPaymentDate, nextPaymentDate, selectedFrequency])

    return(
        <div className={`flex flex-col gap-1 ${selectedFrequency !== 'One time' && selectedFrequency !== 'Daily' ? 'visible' : 'hidden'}`}>
            <label htmlFor="transaction-next-payment-date">Next payment date</label>
            <input 
                className={`px-2 p-1 rounded-lg border-1 border-[#222] outline-none ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                name="transaction-next-payment-date"
                type={inputType}
                id="transaction-next-payment-date"
                autoComplete="off"
                value={transactionNextPaymentDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransactionNextPaymentDate(e.currentTarget.value)}
                disabled={isLoading}
                required
            ></input>
        </div>
    )
}

// type="date"
// min="1900-01-01"
// max={new Date().toLocaleDateString('fr-ca')}