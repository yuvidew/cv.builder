import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectForm } from './ProjectForm'
import { ProjectList } from './ProjectList'


export const Projects = ({
    formType,
    onAddType
}) => {
    return (
        <Tabs defaultValue={"project-form"} className="w-full p-5">
            <TabsList>
                <TabsTrigger value="project-form">Project Form</TabsTrigger>
                <TabsTrigger value="project-list">Project list</TabsTrigger>
            </TabsList>
            <TabsContent value="project-form" className = "pt-5">
                <ProjectForm />
            </TabsContent>
            <TabsContent value="project-list" className = "pt-5">
                <ProjectList  onAddType = {onAddType} formType = {formType} />
            </TabsContent>
        </Tabs>
    )
}
