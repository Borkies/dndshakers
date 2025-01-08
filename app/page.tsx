"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import User from "./Class/User";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sword, Shield, Heart, Zap, Brain, Feather, Eye, Rabbit, Speech, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/input";

//Synchro skills

export default function Home() {
    const [whichSkills, updateWhichSkills] = useState<any>([]);
    const [isTrue, updateIsTrue] = useState(false);
    const races = ["Human", "Orc", "Elf", "Dwarf", "Beastmen", "Skaven", "Lizzardmen", "Tiefling", "Dragonborn", "Gnome"];
    const costs = [0, 1, 1, 2, 2, 3, 3, 4, 5, 6, 8, 10, 12, 15, 20];
    const ProficiencyLevels = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
    const [character, updateCharacter] = useState({
        username: "",
        race: "",
        level: 1,
        experience: 30,
        proficiency: 2,
        hp: 0,
        ac: 0,
        dodge: 0,
        parry: 0,
        abilities: [
            { name: "Agility", shortName: "AGI", score: 6, modifier: -2, icon: <Rabbit className="w-4 h-4" /> },
            { name: "Constitution", shortName: "CON", score: 6, modifier: -2, icon: <Shield className="w-4 h-4" /> },
            { name: "Dexterity", shortName: "DEX", score: 6, modifier: -2, icon: <Feather className="w-4 h-4" /> },
            { name: "Endurace", shortName: "END", score: 6, modifier: -2, icon: <Heart className="w-4 h-4" /> },
            { name: "Strength", shortName: "STR", score: 6, modifier: -2, icon: <Sword className="w-4 h-4" /> },
            { name: "Charisma", shortName: "CHR", score: 6, modifier: -2, icon: <Speech className="w-4 h-4" /> },
            { name: "Intelligence", shortName: "INT", score: 6, modifier: -2, icon: <Brain className="w-4 h-4" /> },
            { name: "Soul", shortName: "SOL", score: 6, modifier: -2, icon: <Sparkles className="w-4 h-4" /> },
            { name: "Perception", shortName: "PER", score: 6, modifier: -2, icon: <Eye className="w-4 h-4" /> },
            { name: "Wisdom", shortName: "WIS", score: 6, modifier: -2, icon: <Zap className="w-4 h-4" /> },
        ],
        skills: [
            {
                name: "AGI",
                ability: [
                    { name: "Acrobatics", value: -2 },
                    { name: "Performance", value: -2 },
                    { name: "Stealth", value: -2 },
                    { name: "Reflexes", value: -2 },
                ],
            },
            {
                name: "CON",
                ability: [
                    { name: "Balance", value: -2 },
                    { name: "Lungs Capacity", value: -2 },
                    { name: "Iron Stomach", value: -2 },
                    { name: "Sickness Resistance", value: -2 },
                ],
            },
            {
                name: "DEX",
                ability: [
                    { name: "Crafting", value: -2 },
                    { name: "Sleight of Hands", value: -2 },
                    { name: "Traper", value: -2 },
                    { name: "Thievery", value: -2 },
                ],
            },
            {
                name: "END",
                ability: [
                    { name: "Temperature Resistance", value: -2 },
                    { name: "Fatigue Resistance", value: -2 },
                    { name: "Pain Tolerance", value: -2 },
                    { name: "Survivability", value: -2 },
                ],
            },
            {
                name: "STR",
                ability: [
                    { name: "Athletics", value: -2 },
                    { name: "Brawling", value: -2 },
                    { name: "Intimidation", value: -2 },
                    { name: "Lifting", value: -2 },
                ],
            },
            {
                name: "CHR",
                ability: [
                    { name: "Animal Handling", value: -2 },
                    { name: "Deception", value: -2 },
                    { name: "Trade", value: -2 },
                    { name: "Persuasion", value: -2 },
                ],
            },
            {
                name: "INT",
                ability: [
                    { name: "Arcana", value: -2 },
                    { name: "Investigation", value: -2 },
                    { name: "Engineering", value: -2 },
                    { name: "Alchemy", value: -2 },
                ],
            },
            {
                name: "SOL",
                ability: [
                    { name: "Concentration", value: -2 },
                    { name: "Faith", value: -2 },
                    { name: "Nature", value: -2 },
                    { name: "Willpower", value: -2 },
                ],
            },
            {
                name: "PER",
                ability: [
                    { name: "Awareness", value: -2 },
                    { name: "Eyesight", value: -2 },
                    { name: "Insight", value: -2 },
                    { name: "Hearing", value: -2 },
                ],
            },
            {
                name: "WIS",
                ability: [
                    { name: "History", value: -2 },
                    { name: "Medicine", value: -2 },
                    { name: "Survival", value: -2 },
                    { name: "Religion", value: -2 },
                ],
            },
        ],
    });

    useEffect(() => {
        var newCharacter = character;
        let modif = Math.floor((6 - 10) / 2);
        newCharacter.ac = modif + 2;
        newCharacter.hp = newCharacter.level * (modif + 5);
        newCharacter.parry = 10 + modif + newCharacter.proficiency;
        newCharacter.dodge = modif + newCharacter.proficiency;
        updateFullCharacter(newCharacter);
        updateIsTrue(true);
    }, []);

    function updateLvl(newLvl: number) {
        let newCharacter = character;
        if (newCharacter.level > newLvl && newCharacter.experience - 20 >= 0) {
            newCharacter.experience -= 20;
            newCharacter.level = newLvl;
        } else if (newCharacter.level < newLvl) {
            newCharacter.experience += 20;
            newCharacter.level = newLvl;
        }
        newCharacter.proficiency = ProficiencyLevels[newLvl - 1];
        updateFullCharacter(newCharacter);
    }

    function checkModifier(newCharacter: any, id: number) {
        let modif = Math.floor((newCharacter.abilities[id].score - 10) / 2);
        let newPerfom = 0;
        newCharacter.abilities[id].modifier = modif;

        //Setting ac to character AC = END MODIF
        if (newCharacter.abilities[id].shortName == "END") {
            newCharacter.ac = modif + 2;
        }
        //Setting HP to character HP = LEVEL * (CON MODIF + 5);
        if (newCharacter.abilities[id].shortName == "CON") {
            newCharacter.hp = newCharacter.level * (modif + 5);
        }
        //Setting PA to character
        if (newCharacter.abilities[id].shortName == "DEX") {
            newCharacter.parry = 10 + modif + newCharacter.proficiency;
        }
        //Setting DA to character
        if (newCharacter.abilities[id].shortName == "AGI") {
            newCharacter.dodge = modif + newCharacter.proficiency;
        }

        updateFullCharacter(newCharacter);
    }

    function updateAbility(abilityLevel: number, id: number) {
        let newCharacter = character;

        if (newCharacter.abilities[id].score < abilityLevel && newCharacter.experience - costs[newCharacter.abilities[id].score - 6] > 0) {
            newCharacter.abilities[id].score += 1;
            newCharacter.experience -= costs[newCharacter.abilities[id].score - 6];
        } else if (newCharacter.abilities[id].score > abilityLevel) {
            newCharacter.experience += costs[newCharacter.abilities[id].score - 6];
            newCharacter.abilities[id].score -= 1;
        }
        checkModifier(newCharacter, id);
    }

    function selectedTable(item: any, id: any) {
        let allSkills = whichSkills;
        let newCharacter = character;
        let modif = Math.floor((newCharacter.abilities[id].score - 10) / 2);

        if (allSkills.includes(item)) {
            allSkills = [...allSkills].filter((oneSkill) => oneSkill !== item);
            updateWhichSkills(allSkills);
        } else if (!allSkills.includes(item)) {
            allSkills.push(item);
            updateWhichSkills([...allSkills]);
        }

        newCharacter.skills.map((skill: any) => {
            skill.ability.map((oneAbility: any) => {
                let newPerfom = 0;
                if (allSkills.includes(oneAbility.name)) {
                    newPerfom = 2;
                }
                oneAbility.value = modif + newPerfom;
            });
        });
        checkModifier(newCharacter, id);
    }

    function updateFullCharacter(newCharacter: any) {
        var updatedCharacter = { ...newCharacter };
        updateCharacter(updatedCharacter);
    }

    return (
        <>
            {isTrue && (
                <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 p-8 flex items-center justify-center">
                    <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-md border-none text-white">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4"></div>
                            <CardTitle className="text-3xl font-bold">{character.username}</CardTitle>
                            <CardDescription className="text-lg text-gray-300">
                                <div className="flex justify-center items-center gap-2">
                                    Level{" "}
                                    <Input
                                        className="w-14 bg-white/10 p-2"
                                        min={1}
                                        max={20}
                                        value={character.level}
                                        onChange={(e) => updateLvl(parseInt(e.target.value))}
                                        type="number"
                                        placeholder="lvl"
                                    />
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Race" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {races.map((race, id) => {
                                                return (
                                                    <SelectItem key={id} value={race}>
                                                        {race}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm">Hit Points</span>
                                    <Progress value={character.hp * 100} className="w-full mt-2" />
                                    <span className="mt-1">{character.hp}</span>
                                </div>
                                <div className="flex justify-around">
                                    <div className="text-center">
                                        <Badge variant="outline" className="text-lg font-bold mb-1">
                                            AC
                                        </Badge>
                                        <div className="text-2xl">{character.ac}</div>
                                    </div>
                                    <div className="text-center">
                                        <Badge variant="outline" className="text-lg font-bold mb-1">
                                            DA
                                        </Badge>
                                        <div className="text-2xl">D20 + {character.dodge}</div>
                                    </div>
                                    <div className="text-center">
                                        <Badge variant="outline" className="text-lg font-bold mb-1">
                                            PA
                                        </Badge>
                                        <div className="text-2xl">{character.parry}</div>
                                    </div>
                                    <div className="text-center">
                                        <Badge variant="outline" className="text-lg font-bold mb-1">
                                            PFC
                                        </Badge>
                                        <div className="text-2xl">{character.proficiency}</div>
                                    </div>
                                </div>
                            </div>

                            <CardDescription className="text-lg text-gray-300 mb-3">
                                <div className="flex justify-center items-center gap-2">Experience {character.experience}</div>
                            </CardDescription>
                            <div className="flex flex-wrap justify-center  gap-4 mb-6 ">
                                {character.abilities.map((ability, id) => (
                                    <Card key={ability.name} className="bg-white/5 border-none w-48">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm ">{ability.shortName}</CardTitle>
                                            {ability.icon}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                <Input
                                                    className="w-14 bg-white/10 border-none my-2 p-2"
                                                    min={6}
                                                    max={20}
                                                    value={ability.score}
                                                    onChange={(e) => updateAbility(parseInt(e.target.value), id)}
                                                    type="number"
                                                    placeholder="lvl"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-300">
                                                Modifier: {ability.modifier >= 0 ? "+" : ""}
                                                {ability.modifier}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <h3 className="text-xl font-bold">Skills</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {character.skills.map((oneSkill, id): any => (
                                    <Table key={oneSkill.name}>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead colSpan={2} className="text-center">
                                                    <Badge variant="outline" className="text-lg font-bold mb-1">
                                                        {oneSkill.name}
                                                    </Badge>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {oneSkill.ability.map((skill) => (
                                                <TableRow key={skill.name}>
                                                    <TableCell className="font-medium">{skill.name}</TableCell>
                                                    <TableCell className="text-right ">
                                                        <a className="mr-3">
                                                            {skill.value >= 0 ? "+" : ""}
                                                            {skill.value}
                                                        </a>
                                                        <Switch
                                                            onCheckedChange={() => selectedTable(skill.name, id)}
                                                            disabled={whichSkills.length >= 2 && !whichSkills.includes(skill.name)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
