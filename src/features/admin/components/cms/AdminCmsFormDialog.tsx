/**
 * Reusable dialog wrapper for admin CMS create/edit forms.
 */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function AdminCmsFormDialog({ open, onOpenChange, title, children }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-groovy text-lg">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh] px-6 pb-6">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
