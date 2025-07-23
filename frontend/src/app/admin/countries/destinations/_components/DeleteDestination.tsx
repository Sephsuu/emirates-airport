import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { DestinationService } from "@/service/destinationService";
import { Destination } from "@/types/destination";
import { DialogTitle } from "@radix-ui/react-dialog";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
    toDelete: Destination;
    setDelete: (i: Destination | undefined) => void;
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteDestination({ toDelete, setDelete, setReload }: Props) {
    const [onProcess, setProcess] = useState(false);

    async function handleSubmit() {
        try {
            setProcess(true);
            if (toDelete.id) {
                const data = await DestinationService.deleteDestination(toDelete.id)
                if (data) toast.success(
                    <>
                        Destination <span className="text-darkred">{toDelete.name}</span> deleted successfully.
                    </>
                );
            }
        } catch (error) { toast.error(`${error}`) }
        finally {
            setProcess(false);
            setDelete(undefined);
            setReload(prev => !prev);
        }
    }

    return(
        <Dialog open onOpenChange={open => { if (!open) setDelete?.(undefined) } }>
            <DialogContent>
                <DialogTitle className="flex items-center gap-4">
                    <div><img src="/images/emirates_logo.png" className="w-12"  /></div>
                    <img src="/images/uae_logo.png" className="w-5"  />
                    <div className="text-md">Delete Destination: <span className="text-darkred">{ toDelete.name }</span></div>
                </DialogTitle>
                <div className="font-emirates-bold">Are you sure to remove destination?</div>
                <div className="flex justify-end gap-2">
                    <DialogClose asChild><Button variant="secondary" size="sm">Cancel</Button></DialogClose>
                    <Button
                        onClick={ handleSubmit }
                        className="!bg-darkred hover:opacity-90"
                        size="sm"
                        disabled={ onProcess }
                    >
                        {onProcess ? (<><LoaderCircle className="w-4 h-4 animate-spin text-light" />Deleting</>) : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}