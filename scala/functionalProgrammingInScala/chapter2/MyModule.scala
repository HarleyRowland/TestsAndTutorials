// A Comment!
/* Another Comment */
/** A document comment */
object MyModule {
	def abs(n: Int): Int =
		if(n < 0) -n
		else n

	private def formatAbs(x: Int) = {
		val msg = "The absolute value of %d is %d"
		msg.format(x, abs(x))
	}

	def main(args: Array[String]) : Unit =
		println(formatAbs(-42))

	def factorial(n: Int): Int = {
		def go(n: Int, acc: Int): Int =
			if(n <= 0) acc
			else go(n-1, n*acc)
		go(n, 1)
	}

	def fib(i: Int): Int = {
		@annotation.tailrec
		def go(first: Int, second: Int, count: Int): Int =
			if(count <= 0) first
			else go(second, first+second, count-1)
		go(0,1,i-1) 
	}
}