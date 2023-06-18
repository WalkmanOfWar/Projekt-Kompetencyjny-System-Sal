package pl.dmcs.Sale;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class SaleApplicationTests {

//	@Test
//	@Transactional
//	public void givenTransactional_whenCheckingForActiveTransaction_thenReceiveTrue() {
//		assertTrue(TransactionSynchronizationManager.isActualTransactionActive());
//	}

}
