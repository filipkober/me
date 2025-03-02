"use client";
import { DoubleOrNothingGame, getGame, initiateGame } from '@/app/fun/gambling/double-or-nothing/actions';
import { Session } from 'next-auth'
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import DoubleOrNothing from './DoubleOrNothing';
import { Label } from './ui/label';
import { useSpecialEffectsContext } from "@/util/contexts/SpecialEffectsContext";
import ShaderBackground from './ShaderBackground';
import Color from '@/util/Color';

interface Props {
    session: Session
}
export default function DoubleOrNothingPage({ session }: Props) {

  const [game, setGame] = useState<DoubleOrNothingGame | null>(null);
  const [coins, setCoins] = useState<number>(session.user.coins!);
  const [bet, setBet] = useState<number>(0);

  const [color1, setColor1] = useState<Color>(Color.black());
  const [color2, setColor2] = useState<Color>(Color.black());

  const { shootStar } = useSpecialEffectsContext();

  useEffect(() => {
    setColor1(Color.random());
    setColor2(Color.random());
    getGame().then(game => setGame(game));
  }, [])

  const handleStart = async () => {
    if(bet <= 0 || session.user.coins! < bet || !Number.isInteger(bet)) return;
    const game = await initiateGame(bet);
    setCoins(c => c - bet);
    if(game) {
      setGame(game);
    }
  }

  return (
    <div className='min-h-screen flex flex-col p-4 gap-4 items-center'>
      <h1 className="text-5xl font-bold">Double or Nothing</h1>
      <p className="text-2xl">you have {coins} coins :)</p>
      <p>Color 1:</p>
      <div className='flex gap-4 w-36'>
      <Input type='color' onChange={e => setColor1(Color.fromHex(e.target.value))} value={color1.toHex()} />
      <span>{color1.toHex()}</span>
      </div>
      <p>Color 2:</p>
      <div className='flex gap-4 w-36'>
        <Input type='color' onChange={e => setColor2(Color.fromHex(e.target.value))} value={color2.toHex()} />
        <span>{color2.toHex()}</span>
      </div>
      {game ? <DoubleOrNothing game={game} setGame={setGame} setCoins={setCoins} shootStar={shootStar} /> : <div>
        
        <Label htmlFor='bet'>Bet</Label>
        <Input type="number" placeholder="Bet" value={bet} onChange={e => setBet(Number(e.target.value))} id='bet' name='bet'/>
        <Button onClick={handleStart}>Start</Button>

        </div>}
        <ShaderBackground color1={color1} color2={color2} />
    </div>
  )
}
