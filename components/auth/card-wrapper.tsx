'use client'
import { Card, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import {Social} from "@/components/auth/social";
import {BackButton} from "@/components/auth/back-button";
interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean,
}

function CardWrapper({ 
    children, 
    headerLabel, 
    backButtonHref, 
    backButtonLabel, 
    showSocial
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
        )}
        <CardFooter>
            <BackButton 
                href={backButtonHref}
                label={backButtonLabel}
            />
        </CardFooter>
    </Card>
  )
}

export default CardWrapper