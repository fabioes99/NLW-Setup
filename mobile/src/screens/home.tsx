import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";


const weekDays = ['D', 'S', 'T', 'Q', 'Q','S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDateSize = 18 *5;
const amountDaysToFill = minimumSummaryDateSize - datesFromYearStart.length;

export function Home(){

  const { navigate } = useNavigation();
  return (
    <View className="flex-1 bg-background px-8 py-16">
     <Header />

    <View className="flex-row mt-6 mb-2">
      {
        weekDays.map((weekDay, i) =>(
          <Text 
          key={`${weekDay}-${i}`}
          className="text-zinc-400 text-xl font-bold text-center mx-1"
          style={{width: DAY_SIZE}}
          >
            {weekDay}
          </Text>
        ))
      }
    </View>
    
    <ScrollView
      contentContainerStyle={{ paddingBottom: 100}}
    >
    <View className="flex-row flex-wrap">
    {
      datesFromYearStart.map(date => (
        <HabitDay 
        key={date.toString()}
        onPress={ () => navigate('habits', { date: date.toISOString()})}
        />
      ))
    }

    {
      amountDaysToFill > 0 && Array
      .from({length: amountDaysToFill})
      .map( (_, index) => (
        <View key={index}
        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
        style={{width: DAY_SIZE, height: DAY_SIZE}}
        />


      )) 
    }


    </View>
    </ScrollView>
  </View>
  )
}