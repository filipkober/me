"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { atbash, caesar, vigenere } from "@/util/ciphers";
import { ArrowDown, Trash } from "lucide-react";
import { useState } from "react";

type Cipher = {
  name: string;
  key: string;
  apply: (text: string) => string;
};

export default function CiphersPage() {
  const [ciphers, setCiphers] = useState<Cipher[]>([]);
  const [caesarShift, setCaesarShift] = useState(1);
  const [vigenereKey, setVigenereKey] = useState("");

  const [text, setText] = useState("");

  const applyCiphers = (text: string, stopIndex?: number) => {
    return ciphers.reduce((acc, cipher, index) => {
      if (stopIndex !== undefined && index > stopIndex) return acc;
      return cipher.apply(acc);
    }, text);
  }

  return (
    <div className="container h-screen mx-auto pt-4 text-center flex-col flex gap-4">
      <h1 className="text-5xl font-bold">Ciphers Page</h1>
      <p>Here you can apply ciphers to text! You can chain them together</p>
      <h2>Available Ciphers:</h2>
      <Accordion type="multiple" className="w-1/2 mx-auto text-left">
        <AccordionItem value="caesar">
          <AccordionTrigger>Caesar Cipher</AccordionTrigger>
          <AccordionContent>
            <p>
              Caesar&apos;s cipher is a type of substitution cipher in which
              each letter in the plaintext is shifted a certain number of places
              down the alphabet. For example, with a shift of 1, A would be
              replaced by B, B would become C, and so on.
            </p>
            <div className="flex gap-2 w-[80%] mt-2">
              <Button
                onClick={() => {
                    setCiphers(c => [...c, {
                        name: "Caesar",
                        key: caesarShift.toString(),
                        apply: text => caesar(text, caesarShift.toString())
                    }])
                }}
              >Add to chain</Button>
              <Label htmlFor="caesar-shift" className="my-auto">
                Shift:
              </Label>
              <Input
                type="number"
                id="caesar-shift"
                name="caesar-shift"
                className="w-1/5"
                step={1}
                value={caesarShift}
                onChange={(e) => setCaesarShift(Number(e.target.value))}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vigenere">
          <AccordionTrigger>Vigenère Cipher</AccordionTrigger>
          <AccordionContent>
            <p>
              The Vigenère cipher is a method of encrypting alphabetic text by
              using a simple form of polyalphabetic substitution. A keyword
              determines the letter shift for each letter in the plaintext.
            </p>
            <div className="flex gap-2 w-[80%] mt-2">
              <Button
                onClick={() => {
                    setCiphers(c => [...c, {
                        name: "Vigenère",
                        key: vigenereKey,
                        apply: text => vigenere(text, vigenereKey)
                    }])
                }}
              >Add to chain</Button>
              <Label htmlFor="vigenere-key" className="my-auto">
                Key:
              </Label>
              <Input
                type="text"
                id="vigenere-key"
                name="vigenere-key"
                className="w-1/5"
                value={vigenereKey}
                onChange={(e) => setVigenereKey(e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="atbash">
          <AccordionTrigger>Atbash Cipher</AccordionTrigger>
          <AccordionContent>
            <p>
              The Atbash cipher is a substitution cipher with a specific key
              where the letters of the alphabet are reversed. I.e. all As are
              replaced with Zs, all Bs are replaced with Ys, and so on.
            </p>
            <Button
              onClick={() => {
                setCiphers(c => [...c, {
                    name: "Atbash",
                    key: "",
                    apply: text => atbash(text)
                }])
              }}
              className="mt-2"
            >Add to chain</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2 className="text-3xl">Text to apply ciphers to:</h2>
        <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-1/2 mx-auto"
        />
      <h2 className="text-3xl">Your chain:</h2>
        <div className="flex flex-col gap-2 w-1/2 mx-auto text-center">
            {ciphers.map((cipher, index) => (
            <div key={index} className="flex flex-col gap-2">    
            <div className="flex flex-row gap-2 w-max mx-auto relative">
            <Button onClick={() => setCiphers(c => c.filter((_, i) => i !== index))} className="bg-transparent hover:text-red-600 hover:bg-transparent absolute -left-12"><Trash /></Button>
            <div className="flex gap-2 w-max mx-auto justify-center outline-dashed outline-2 outline-[hsl(var(--border))] p-2 rounded-xl">
                <span>{cipher.name}</span>
                {cipher.key && <span>[{cipher.key}]</span>}
                <span>:</span>
                <span>{applyCiphers(text, index)}</span>
            </div>
            </div>
            {index < ciphers.length - 1 && (
                <ArrowDown className="w-10 h-10 mx-auto" />
            )}
            </div>
            ))}
            <Button onClick={() => setCiphers([])} className="my-4">Clear chain</Button>
        </div>
    </div>
  );
}
