import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tabsList, tabsTriggers } from "@/utils/layout/tabs";

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="users" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
        {tabsTriggers.map((tab, index) => (
          <TabsTrigger
            key={`${index + Math.random() + 5000000}${new Date()}`}
            value={tab.toLocaleLowerCase()}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsList.map((tab, index) => (
        <TabsContent
          key={`${index + Math.random() + 5000000}${new Date()}`}
          value={tab.value}
        >
          <Card>
            <CardHeader>
              <CardTitle>{tab.title}</CardTitle>
              <CardDescription>{tab.desc}</CardDescription>
            </CardHeader>
            {tab.content}
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SettingsTabs;
