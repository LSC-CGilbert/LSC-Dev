<?php

namespace Meetanshi\ImageClean\Console;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Meetanshi\ImageClean\Helper\Data;
use Magento\Catalog\Model\ProductFactory;
use Magento\Catalog\Api\ProductRepositoryInterface;
use Meetanshi\ImageClean\Model\ImagecleanFactory;
use Meetanshi\ImageClean\Model\Imageclean;

/**
 * Class CleanProductUseImage
 * @package Meetanshi\ImageClean\Console
 */
class CleanProductUseImage extends Command
{
    /**
     * @var Data
     */
    protected $helper;
    /**
     * @var ProductFactory
     */
    protected $productFactory;
    /**
     * @var ProductRepositoryInterface
     */
    protected $productRepository;
    /**
     * @var ImagecleanFactory
     */
    protected $imageCleanFactory;
    /**
     * @var Imageclean
     */
    protected $imageClean;

    /**
     * CleanProductUseImage constructor.
     * @param Data $data
     * @param ImagecleanFactory $imagecleanFactory
     * @param ProductFactory $productFactory
     * @param ProductRepositoryInterface $productRepository
     * @param Imageclean $imageclean
     */
    public function __construct(
        Data $data,
        ImagecleanFactory $imagecleanFactory,
        ProductFactory $productFactory,
        ProductRepositoryInterface $productRepository,
        Imageclean $imageclean
    ) {
        $this->helper = $data;
        $this->imageCleanFactory = $imagecleanFactory;
        $this->productFactory = $productFactory;
        $this->productRepository = $productRepository;
        $this->imageClean = $imageclean;
        parent::__construct($name = null);
    }

    /**
     *
     */
    protected function configure()
    {
        $this->setName('imageclean:product-used-image:clean');
        $this->setDescription('Clear Product Used Image(s)');
        parent::configure();
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->helper->clearUsedImages();
        $output->writeln("Product's Used Image(s) was successfully cleaned");
    }
}
