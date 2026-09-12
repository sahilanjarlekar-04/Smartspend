package com.expensetracker.service;

import com.expensetracker.dto.SummaryResponse;
import com.expensetracker.model.Transaction;
import com.expensetracker.model.TransactionType;
import com.expensetracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByDateDescIdDesc();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public Transaction createTransaction(Transaction transaction) {
        if (transaction.getDate() == null) {
            transaction.setDate(LocalDate.now());
        }
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Long id, Transaction updatedTransaction) {
        return transactionRepository.findById(id).map(existing -> {
            existing.setTitle(updatedTransaction.getTitle());
            existing.setAmount(updatedTransaction.getAmount());
            existing.setType(updatedTransaction.getType());
            existing.setCategory(updatedTransaction.getCategory());
            existing.setDate(updatedTransaction.getDate());
            existing.setPaymentMethod(updatedTransaction.getPaymentMethod());
            existing.setNotes(updatedTransaction.getNotes());
            return transactionRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public SummaryResponse getSummary() {
        BigDecimal totalIncome = transactionRepository.getTotalByTransactionType(TransactionType.INCOME);
        if (totalIncome == null) totalIncome = BigDecimal.ZERO;

        BigDecimal totalExpenses = transactionRepository.getTotalByTransactionType(TransactionType.EXPENSE);
        if (totalExpenses == null) totalExpenses = BigDecimal.ZERO;

        BigDecimal netBalance = totalIncome.subtract(totalExpenses);
        Long totalCount = transactionRepository.count();

        List<Object[]> categoryData = transactionRepository.getExpenseSummaryByCategory();
        Map<String, BigDecimal> categoryBreakdown = new HashMap<>();
        for (Object[] row : categoryData) {
            String category = (String) row[0];
            BigDecimal amount = (BigDecimal) row[1];
            categoryBreakdown.put(category, amount);
        }

        return new SummaryResponse(totalIncome, totalExpenses, netBalance, totalCount, categoryBreakdown);
    }
}
