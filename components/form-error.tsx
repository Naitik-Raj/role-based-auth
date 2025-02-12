import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormErrorProps {
    message?: string;
}

export const FormError = ({ 
    message 
}: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-2 text-sm text-destructive">
            <ExclamationTriangleIcon className="w-4 h-4" />
            {message}
        </div>
    )
}