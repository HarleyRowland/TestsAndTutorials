// A Comment!
/* Another Comment */
/** A document comment */
object MyModule {
	def abs(n: Int): Int =
		if(n < 0) -n
		else n

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

	def findFirst(ss: Array[String], key: String): Int = {
		@annotation.tailrec
		def loop(n: Int): Int = 
			if(n >= ss.length) -1
			else if(ss(n) == key) n
			else loop(n+1)
		loop(0)
	}

	def findFirst[A](as: Array[A], p: A => Boolean) : Int = {
		@annotation.tailrec
		def loop(n: Int): Int = 
			if(n >= as.length) -1
			else if(p(as(n))) n
			else loop(n+1)
		loop(0)	
	}
	
	def isSorted[A](as: Array[A], p: (A,A) => Boolean) : Boolean = {
		@annotation.tailrec
		def loop(n: Int): Boolean =
      		if(n >= as.length-1) true
			else if(p(as(n), as(n+1))) false
			else loop(n+1)
		loop(0)
	}

	def curry[A,B,C](f: (A,B) => C): A => (B => C) = {
		a => b => f(a,b)
	}

	def uncurry[A,B,C](f: A => B => C): (A,B) => C = {
		(a,b) => f(a)(b)
	}

	def compose[A,B,C](f: B => C, g: A => B): A => C = {
		a => f(g(a))
	}

	private def formatResult(name: String, x: Int, f: Int => Int) = {
		val msg = "The %s value of %d is %d"
		msg.format(name, x, f(x))
	}

	private def formatAbs(x: Int) = {
		val msg = "The absolute value of %d is %d"
		msg.format(x, abs(x))
	}

	private def formatFactorial(x: Int) = {
		val msg = "The factorial value of %d is %d"
		msg.format(x, abs(x))
	}

	def main(args: Array[String]) : Unit = {
		println(formatResult("factorial", 3, factorial))
		println(formatResult("absolute", -3, abs))
	}
}