import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AdicionarContaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdicionarContaModal: React.FC<AdicionarContaModalProps> = ({ isOpen, onClose }) => {
  const [nomeConta, setNomeConta] = useState("");
  const [tipoConta, setTipoConta] = useState("");
  const [saldoAtual, setSaldoAtual] = useState("");

  const handleAddAccount = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      alert("Você precisa estar logado para adicionar uma conta.");
      return;
    }

    const accountData = {
      name: nomeConta,
      type: tipoConta,
      balance: parseFloat(saldoAtual) || 0.00,
    };

    try {
      const response = await fetch("http://localhost/api/add_account.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User": JSON.stringify({ id: user.id }), 
        },
        body: JSON.stringify(accountData),
      });

      const result = await response.json();
      if (result.error) {
        console.error(result.error);
        alert("Erro ao adicionar conta: " + result.error);
      } else {
        console.log("Sucesso:", result);
        alert("Conta adicionada com sucesso!");
        setNomeConta("");
        setTipoConta("");
        setSaldoAtual("");
        onClose();
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Conta</DialogTitle>
          <p className="text-sm text-gray-500">
            Adicione uma nova conta bancária, dinheiro em espécie ou outra instituição financeira.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="nomeConta" className="mb-2">Nome da Conta</Label>
            <Input
              id="nomeConta"
              placeholder="ex: Nubank Conta"
              value={nomeConta}
              onChange={(e) => setNomeConta(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="tipoConta" className="mb-2">Tipo de Conta</Label>
            <Input
              id="tipoConta"
              placeholder="ex: Conta Corrente, Poupança, Dinheiro"
              value={tipoConta}
              onChange={(e) => setTipoConta(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="saldoAtual" className="mb-2">Saldo Atual</Label>
            <Input
              id="saldoAtual"
              type="number"
              placeholder="0,00"
              value={saldoAtual}
              onChange={(e) => setSaldoAtual(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="cursor-pointer">
            Cancelar
          </Button>
          <Button onClick={handleAddAccount} className="cursor-pointer">
            Adicionar Conta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdicionarContaModal;